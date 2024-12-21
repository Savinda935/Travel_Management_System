const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: Number, // String for flexible formats
        required: true,
    },
    arrivalDate: {
        type: Date,
        required: true,
    },
    departureDate: {
        type: Date,
        required: true,
    },
    comments: {
        type: String, // Optional field
        default: "",
    },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
