const mongoose = require('mongoose');

const Transport = new mongoose.Schema({
    lineNumber: {
        type: String,
        required: true,
        unique: true,
    },
    stops:{
        type: Array,
        
    },
    icon:{
        type: String
    },

    stopLocation:{
        type:Object,
        required:true
    },
    initLocation:{
        type:Object,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    },
    {
        versionKey: false
    });


module.exports = mongoose.model('Transport', Transport);
