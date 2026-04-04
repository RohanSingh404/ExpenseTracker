import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const last30daysExpenses = ({data}) => {
    const [chartData , setchartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        setchartData(result);

        return () => {};
    } , [data]);

  return (
    <div className='card col-span-1'>
        <div className='flex justify-between items-center'>
            <h5 className='text-sm'>Last30daysExpenses</h5>
        </div>

        <CustomBarChart data={chartData} />
    </div>

    
  )
}

export default last30daysExpenses