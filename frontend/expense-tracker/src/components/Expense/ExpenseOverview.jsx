import React, { useEffect , useState} from 'react'
import{
    LuPlus
} from 'react-icons/lu'
import CustomLineChart from '../Charts/CustomLineChart'
import { prepareExpenseLineChartData } from '../../utils/helper'



const ExpenseOverview = ({transactions , onAddExpense}) => {
    const [chartData , setChartData] = useState([])

    useEffect(() =>{
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result);

        return () => {};
    },[transactions])


  return (
    <div className='card'>
        <div className='flex justify-between items-center'>
            <div>
                <h5 className='text-lg'>Expense Overview</h5>
                <p className='text-gray text-xs mt-0.5'>
                    Track your Spending over time and analyze your expenses trends.
                </p>
            </div>

            <button className='add-btn' onClick={onAddExpense}>
                <LuPlus className='text-lg'/>
                Add Expense
            </button>
        </div>

        <div>
            <CustomLineChart data = {chartData} />
        </div>
    </div>
  )
}

export default ExpenseOverview