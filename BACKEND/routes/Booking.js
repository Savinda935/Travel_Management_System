const router = require("express").Router();
const Booking = require("../models/Booking");

// Create a new booking
router.post("/add", (req, res) => {
    const { name, email, country, contactNumber, arrivalDate, departureDate, comments } = req.body;

    const newBooking = new Booking({
        name,
        email,
        country,
        contactNumber,
        arrivalDate,
        departureDate,
        comments,
    });

    newBooking
        .save()
        .then(() => res.status(201).json({ status: "Booking added successfully!" }))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ status: "Error adding booking", error: err.message });
        });
});

// Read all bookings
router.get("/", (req, res) => {
    Booking.find()
        .then((bookings) => res.json(bookings))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ status: "Error fetching bookings", error: err.message });
        });
});

// Update a booking by ID
router.put("/update/:id", async (req, res) => {
    const bookingId = req.params.id;
    const { name, email, country, contactNumber, arrivalDate, departureDate, comments } = req.body;

    const updateBooking = {
        name,
        email,
        country,
        contactNumber,
        arrivalDate,
        departureDate,
        comments,
    };

    try {
        const updatedBooking = await Booking.findByIdAndUpdate(bookingId, updateBooking, { new: true });
        if (updatedBooking) {
            res.status(200).json({ status: "Booking updated", booking: updatedBooking });
        } else {
            res.status(404).json({ status: "Booking not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error updating booking", error: err.message });
    }
});

// Delete a booking by ID
router.delete("/delete/:id", async (req, res) => {
    const bookingId = req.params.id;

    try {
        const deletedBooking = await Booking.findByIdAndDelete(bookingId);
        if (deletedBooking) {
            res.status(200).json({ status: "Booking deleted" });
        } else {
            res.status(404).json({ status: "Booking not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error deleting booking", error: err.message });
    }
});

// Get a booking by ID
router.get("/get/:id", async (req, res) => {
    const bookingId = req.params.id;

    try {
        const bookingDetails = await Booking.findById(bookingId);
        if (bookingDetails) {
            res.status(200).json({ status: "Booking fetched", booking: bookingDetails });
        } else {
            res.status(404).json({ status: "Booking not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error fetching booking", error: err.message });
    }
});

module.exports = router;
