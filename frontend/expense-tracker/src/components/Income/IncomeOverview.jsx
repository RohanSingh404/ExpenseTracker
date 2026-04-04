import React, { useEffect , useState} from 'react'
import{
    LuPlus
} from 'react-icons/lu'
import CustomBarChart from '../Charts/CustomBarChart'
import { prepareIncomeBarChartData } from '../../utils/helper'



const IncomeOverview = ({transactions , onAddIncome}) => {
    const [chartData , setChartData] = useState([])

    useEffect(() =>{
        const result = prepareIncomeBarChartData(transactions);
        setChartData(result);

        return () => {};
    },[transactions])


  return (
    <div className='card'>
        <div className='flex justify-between items-center'>
            <div>
                <h5 className='text-lg'>Income Overview</h5>
                <p className='text-gray text-xs mt-0.5'>
                    Track your earning over time and analyze your income trends.
                </p>
            </div>

            <button className='add-btn' onClick={onAddIncome}>
                <LuPlus className='text-lg'/>
                Add Income
            </button>
        </div>

        <div>
            <CustomBarChart data = {chartData} />
        </div>
    </div>
  )
}

export default IncomeOverview