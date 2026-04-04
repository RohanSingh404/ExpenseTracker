const express = require("express");
const Expense = require("../models/Expense");
const xlsx = require("xlsx");

exports.addExpense = async (req, res) => {
    const userId = req.user.id;
    const {icon , amount, category, date} = req.body;

    //validation for missing fields
    if(!amount || !category || !date){
        return res.status(400).json({message: "Please fill all the fields"});
    }

    const newExpense = new Expense({
        userId,
        icon,
        amount,
        category,
        date: new Date(date)
    });

    try {
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(500).json({message: "Error saving expense"});
    }
};

exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const expenses = await Expense.find({userId}).sort({date: -1});
        res.status(200).json(expenses);
    }
    catch(error){
        res.status(500).json({message: "Error fetching expenses"});
    }
};

exports.deleteExpense = async (req, res) => {
    try{
        const expense = await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Expense deleted successfully"});
    }
    catch(error){
        res.status(500).json({message: "Error deleting expense"});
    }
};

exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try{
        const expenses = await Expense.find({userId}).sort({date: -1});
        const excelData = expenses.map((expense) => ({
            Amount: expense.amount,
            Category: expense.category,
            Date: expense.date.toISOString().split('T')[0],
        }));
        
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(excelData);
        xlsx.utils.book_append_sheet(wb, ws, "Expenses");
        
        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
        
        res.setHeader('Content-Disposition', 'attachment; filename="expense_details.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    }
    catch(error){
        res.status(500).json({message: "Error fetching expenses"});
    }
};