import express from 'express'; 
import { addtranaction } from '../Controllers/Transaction.js'; 
import { getTransactions } from '../Controllers/Transaction.js';


const router = express.Router();

router.post("/addtranaction", addtranaction);
router.get("/getTransactions/:userId", getTransactions);


export default router;