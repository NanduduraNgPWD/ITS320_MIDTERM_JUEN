
import Quote from '../models/quotesModel.js'

async function createQuote(req,res){
    const {quote, author, published, title} = req.body;

    if (!quote || !author || !published || !title) {
        res.send('Please fill out all fields')
    }

    const newQuote = Quote.create({
        quote, author, published, title
    })

    if (!newQuote) {
        res.status(500).send('Error while creating user')
    }

    return res.status(200).send('Quote successfully created.')
}

async function getQuotes(req, res) {
    try {
        const quotes = await Quote.find();
        res.json(quotes); 
    } catch (error) {
        console.error("Error fetching quotes:", error);
        res.status(500).json({ error: "Failed to fetch quotes" }); 
    }
}


export {createQuote, getQuotes};