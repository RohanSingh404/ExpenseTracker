import React , {useState,useEffect} from 'react'
import DashboardLayouts from '../../components/layouts/DashboardLayouts'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Model from '../../components/Model';
import toast from 'react-hot-toast';
import DeleteAlert from '../../components/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import ExpenseList from '../../components/Expense/ExpenseList';

const Expense = () => {
  useUserAuth();
    
    const [expenseData , setExpenseData] = useState([]);
    const [loading , setLoading] = useState(false);
    const [openDeleteAlert , setOpenDeleteAlert] = useState({
      show : false,
      data : null
    });
    const [OpenAddExpenseModel , setOpenAddExpenseModel] = useState(false);


    // Get all expense details
      const fetchExpenseDetails = async() => {
        if(loading) return;
    
        setLoading(true);
    
        try{
          const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_EXPENSE}`);
          if(response.data){
            setExpenseData(response.data);
          }
        }catch(err){
          console.log("Something went wrong" , err);
        }finally{
          setLoading(false)
        }
      }
    
      // Handle Add expense
      const handleAddExpense = async(expense) => {
        
        const {category , amount , date , icon} = expense;
        //validation 
        if(!category.trim()){
          toast.error("Category is Required");
          return;
        }
    
        if(!amount || isNaN(amount) || Number(amount) <= 0){
          toast.error("Amount should be Valid Number greater than Zero");
          return;
        }
    
        if(!date){
          toast.error("Date is Required")
          return;
        }
    
        try{
          await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE , {
            category ,
            amount , 
            date , 
            icon
          });
    
          setOpenAddExpenseModel(false);
          toast.success("Expense Added Successfully");
          fetchExpenseDetails();
        }catch(error){
          console.error(
            "Error adding Expense : ",
            error.response?.data?.message || error.message
          );
        }
      };
    
      // Delete expense 
      const deleteExpense = async(id) => {
        try{
          await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
          setOpenDeleteAlert({show : false , data : null});
          toast.success("Expense Deleted Succesfully");
          fetchExpenseDetails();
        }catch(error){
          console.error(
            "Error Deleting Expense" , 
            error?.response?.data?.message || error.message
          );
        }
      }
    
      // Handle download Expense details
      const handleDownloadExpenseDetails = async () => {
  try {
    const response = await axiosInstance.get(
      API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
      { responseType: "blob" }
    );

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "expense_details.xlsx";
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading Expense details", error);
    toast.error("Error Downloading Expense Details, try again");
  }
};
    
      useEffect(() =>{
        fetchExpenseDetails();
      },[])
  return (
    <DashboardLayouts activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <ExpenseOverview 
            transactions = {expenseData}
            onAddExpense = {() => setOpenAddExpenseModel(true)}
            />
          </div>

          <ExpenseList
          transactions = {expenseData}
          onDelete = {(id) =>{
            setOpenDeleteAlert({
              show : true,
              data : id
            });
          }}
          onDownload = {handleDownloadExpenseDetails}
          />

        </div>

        <Model
        isOpen = {OpenAddExpenseModel}
        onClose = {() => setOpenAddExpenseModel(false)}
        title = "Add Expense"
        >
          <div>
            <AddExpenseForm onAddExpense={handleAddExpense} />
          </div>
        </Model>

        <Model
        isOpen = {openDeleteAlert.show}
        onClose = {() => setOpenDeleteAlert({show : false , data : null})}
        title = "Delete Expense"
        >
          <DeleteAlert
          content = "Are you sure you want to Delete this Expense"
          onDelete = {() => deleteExpense(openDeleteAlert.data)}
          />
        </Model>
      </div>
    </DashboardLayouts>
  )
}

export default Expense