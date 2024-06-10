const mongoose = require('mongoose')

const candidateSchema = new mongoose.Schema({

    user:{
        type:String,
        required:true
    },

    Party:{
        type:String,
        required:true,

    },

    age:{
        type:Number,
        required:true
    },

    votes:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'user',
                required:true,
            },

            votedAt:{
                type:Date,
                default: Date.now(),
            }
        }
    ],

    voteCount :{
        type:Number,
        default:0

    }
});

const Candidate = mongoose.model('Candidate' , candidateSchema)

module.exports = Candidate