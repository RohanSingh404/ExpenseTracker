const Income = require('../models/Income');
const xlsx = require("xlsx");

exports.addIncome = async (req, res) => {
    const userId = req.user.id;
    const {icon , amount, source, date} = req.body;

    //validation for missing fields
    if(!amount || !source || !date){
        return res.status(400).json({message: "Please fill all the fields"});
    }

    try {
        const income = new Income({
            userId,
            icon,
            amount,
            source,
            date : new Date(date)
        });
        await income.save();
        res.status(201).json({message: "Income added successfully"});
    } catch (error) {
        res.status(500).json({message: "Error adding income"});
    }
};

exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try{
        const incomes = await Income.find({userId}).sort({date: -1});
        res.status(200).json(incomes);
    }
    catch(error){
        res.status(500).json({message: "Error fetching income"});
    }
};

exports.deleteIncome = async (req, res) => {
    try{
        const income = await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Income deleted successfully"});
    }
    catch(error){
        res.status(500).json({message: "Error deleting income"});
    }
};

exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try{
        const incomes = await Income.find({userId}).sort({date: -1});
        const excelData = incomes.map((income) => ({
            Amount: income.amount,
            Source: income.source,
            Date: income.date.toISOString().split('T')[0],
        }));
        
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(excelData);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        
        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
        
        res.setHeader('Content-Disposition', 'attachment; filename="income_details.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    }
    catch(error){
        res.status(500).json({message: "Error fetching income"});
    }

};