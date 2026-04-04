import React from 'react'
import{
    LuArrowRight
} from 'react-icons/lu'
import moment from 'moment'

import TransactionInfoCard from '../Cards/TransactionInfoCard'

const ExpenseTransactions = ({transactions , onSeeMore}) => {
  return (
      <div className="card">
        <div className='flex justify-between items-center'>
          <h5 className='text-lg'>Expenses</h5>
  
          <button className='card-btn flex items-center justify-center gap-2 ' onClick={onSeeMore}>See More <LuArrowRight className='text-base'></LuArrowRight></button>
        </div>
  
        <div className='mt-6'>
          {transactions?.slice(0,5)?.map((item) =>(
            <TransactionInfoCard
          key = {item._id}
          title = {item.category}
          icon = {item.icon}
          date = {moment(item.date).format("Do MMM YYYY")}
          amount = {item.amount}
          type = "expense"
          hideDeleteBtn
          />
          ))}
        </div>
      </div>
    )
}

export default ExpenseTransactions