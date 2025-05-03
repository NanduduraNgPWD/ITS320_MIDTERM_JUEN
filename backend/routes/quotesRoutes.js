import { createQuote, getQuotes } from "../controller/quotesController.js";
import e from "express";

export const router = e.Router();

router.post('/create', createQuote);
router.get('/', getQuotes);