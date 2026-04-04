const Income = require("../models/Income");
const Expense = require("../models/Expense");
const {isValidObjectId , Types} = require("mongoose");

//dashboard Data
const getDashboardData = async (req, res) => {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    try {
        const totalIncome = await Income.aggregate([
            {$match: {userId: userObjectId}},
            {$group: {_id: null, total: {$sum: "$amount"}}}
        ]);
        console.log("Total Income:", {totalIncome , userId: isValidObjectId(userId)});

        
        const totalExpenses = await Expense.aggregate([
            {$match: {userId: userObjectId}},
            {$group: {_id: null, total: {$sum: "$amount"}}}
        ]);
        
        //60daysIncome
        const last60daysIncomeTransactions = await Income.find({
            userId: userObjectId,
            date: {$gte: new Date(Date.now() - 60*24*60*60*1000)}
        }).sort({date: -1}).limit(5);


        //TotalIncome for last 60 days
        const incomelast60days = await last60daysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0);


        //get expense transaction in last 30 days
        const last30daysExpenseTransactions = await Expense.find({
            userId: userObjectId,
            date: {$gte: new Date(Date.now() - 30*24*60*60*1000)}
        }).sort({date: -1}).limit(5);


        //total expenses for last 30 days
        const expenselast30days = await last30daysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0);

        //fetch last 5 transactions(income + expenses)
        const lastTransactions = [
            ...((await Income.find({userId: userObjectId}).sort({date: -1}).limit(5)).map(
                (transaction) => (
                    {...transaction.toObject(),
                    type: "income"}
                )
            )),
            ...((await Expense.find({userId: userObjectId}).sort({date: -1}).limit(5)).map(
                (transaction) => (
                    {...transaction.toObject(),
                    type: "expense"}
                )
            ))
        ].sort((a, b) => b.date - a.date).slice(0, 5)//sort latest first and take top 5

        //final response
        res.json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpenses[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpenses: totalExpenses[0]?.total || 0,
            last30daysExpenses:{
                total: expenselast30days,
                transactions: last30daysExpenseTransactions
            },
            last60daysIncome:{
                total: incomelast60days,
                transactions: last60daysIncomeTransactions
            },
            recentTransactions: lastTransactions
        })

    } catch (error) {
        res.status(500).json({message: "Error fetching dashboard data"});
    }
};

module.exports = { getDashboardData };