const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const guideSchema = new Schema({
    total:{
        type: Number,
        required: true,
    },
    partysize:{
        type: Number,
        required: true,
    },
    tourdate:{
        type: Date,
        required: true,
    },
    time:{
        type: String,
        required: true,
    },
    guidename:{
        type: String,
        required: true,
    },

    // Add any other fields you need for your guide schema here
});

const Guide=mongoose.model("Guide",guideSchema);
module.exports = Guide;
