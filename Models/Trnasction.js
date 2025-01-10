import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["income", "expense"],
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
    },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;