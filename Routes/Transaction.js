import express from 'express'; 
import { addtranaction } from '../Controllers/Transaction.js'; 
import { getTransactions } from '../Controllers/Transaction.js';
import { deleteTransaction } from '../Controllers/Transaction.js';


const router = express.Router();

router.post("/addtranaction", addtranaction);
router.get("/getTransactions/:userId", getTransactions);
router.delete("/deleteTransaction/:id", deleteTransaction);


export default router;