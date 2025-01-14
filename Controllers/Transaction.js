import Transaction from "./../Models/Trnasction.js";

export const addtranaction = async (req, res) => {
    const { userId, amount, type,category,date } = req.body;
    try {
        const newTransaction = new Transaction({userId,amount,type,category,date});
        await newTransaction.save();
        res.status(200).json(newTransaction);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

export const getTransactions = async (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    try {
        const transactions = await Transaction.find({userId});
        res.status(200).send(transactions);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

export const deleteTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        await Transaction.findByIdAndDelete(id);
        res.status(200).send("Transaction deleted successfully");
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

