import mongoose from 'mongoose'

const quoteSchema = mongoose.Schema({
    quote:{
        type: String,
        required: [true, 'WEW']
    },

    author:{
        type: String,
        required: [true, 'WEW']
    },

    published:{
        type: String,
        required: [true, 'WEW']
    },

    title:{
        type: String,
        required: [true, 'WEW']
    }
})

export default mongoose.model('Quote', quoteSchema);