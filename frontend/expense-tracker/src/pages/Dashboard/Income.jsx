import React, { useEffect, useState } from 'react'
import DashboardLayouts from '../../components/layouts/DashboardLayouts'
import IncomeOverview from '../../components/Income/IncomeOverview';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Model from '../../components/Model';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';

const Income = () => {
  useUserAuth();

  const [incomeData , setIncomeData] = useState([]);
  const [loading , setLoading] = useState(false);
  const [openDeleteAlert , setOpenDeleteAlert] = useState({
    show : false,
    data : null
  });
  const [OpenAddIncomeModel , setOpenAddIncomeModel] = useState(false);

  // Get all income details
  const fetchIncomeDetails = async() => {
    if(loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);
      if(response.data){
        setIncomeData(response.data);
      }
    }catch(err){
      console.log("Something went wrong" , err);
    }finally{
      setLoading(false)
    }
  }

  // Handle Add income
  const handleAddIncome = async(income) => {
    
    const {source , amount , date , icon} = income;
    //validation 
    if(!source.trim()){
      toast.error("Source is Required");
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME , {
        source ,
        amount , 
        date , 
        icon
      });

      setOpenAddIncomeModel(false);
      toast.success("Income Added Successfully");
      fetchIncomeDetails();
    }catch(error){
      console.error(
        "Error adding Income : ",
        error.response?.data?.message || error.message
      );
    }
  };

  // Delete income 
  const deleteIncome = async(id) => {
    try{
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({show : false , data : null});
      toast.success("Income Deleted Succesfully");
      fetchIncomeDetails();
    }catch(error){
      console.error(
        "Error Deleting Income" , 
        error?.response?.data?.message || error.message
      );
    }
  }

  // Handle download income details
  const handleDownloadIncomeDetails = async() => {
    try{
          const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
            responseType : 'blob',
          })

          //create URL for blob
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download" , "income_details.xlsx");
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
          window.URL.revokeObjectURL(url);
        }catch(error){
          console.error(
            "Error downloading Expense details",error
          );
          toast.error("Error Downloading Expense Details , try again");
        }
  }

  useEffect(() =>{
    fetchIncomeDetails();
  },[])


  return (
    <DashboardLayouts activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview 
            transactions = {incomeData}
            onAddIncome = {() => setOpenAddIncomeModel(true)}
            />
          </div>

          <IncomeList
          transactions = {incomeData}
          onDelete = {(id) =>{
            setOpenDeleteAlert({
              show : true,
              data : id
            });
          }}
          onDownload = {handleDownloadIncomeDetails}
          />

        </div>

        <Model
        isOpen = {OpenAddIncomeModel}
        onClose = {() => setOpenAddIncomeModel(false)}
        title = "Add Income"
        >
          <div>
            <AddIncomeForm onAddIncome={handleAddIncome} />
          </div>
        </Model>

        <Model
        isOpen = {openDeleteAlert.show}
        onClose = {() => setOpenDeleteAlert({show : false , data : null})}
        title = "Delete Income"
        >
          <DeleteAlert
          content = "Are you sure you want to Delete this Income"
          onDelete = {() => deleteIncome(openDeleteAlert.data)}
          />
        </Model>
      </div>
    </DashboardLayouts>
  )
}

export default Income