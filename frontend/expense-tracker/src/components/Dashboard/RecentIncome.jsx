import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
const RecentIncome = ({transactions , onSeeMore}) => {
  return (
      <div className="card">
        <div className='flex justify-between items-center'>
          <h5 className='text-lg'>Income</h5>
  
          <button className='card-btn flex items-center justify-center gap-2 ' onClick={onSeeMore}>See More <LuArrowRight className='text-base'></LuArrowRight></button>
        </div>
  
        <div className='mt-6'>
          {transactions?.slice(0,5)?.map((income) => (
            <TransactionInfoCard
              key={income._id}
              title={income.source}
              icon={income.icon}
              date={moment(income.date).format("Do MMM YYYY")}
              amount={income.amount}
              type="income"
              hideDeleteBtn
            />
          ))}
        </div>
      </div>
    )
}

export default RecentIncome