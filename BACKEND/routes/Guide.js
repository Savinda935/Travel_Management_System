const router = require("express").Router();
const Guide = require("../models/Guide");

// Create a new guide

router.post("/add", (req, res) => {
    const {total,partysize,tourdate,time,guidename } = req.body;

    const newGuide = new Guide({
        total,
        partysize,
        tourdate,
        time,
        guidename
    });

    newGuide
        .save()
        .then(() => res.status(201).json({ status: "Guide added successfully!" }))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ status: "Error adding Guide", error: err.message });
        });
});


// Read all bookings
router.get("/", (req, res) => {
    Guide.find()
        .then((guides) => res.json(guides))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ status: "Error fetching guide", error: err.message });
        });
});
// Update a booking by ID
router.put("/update/:id", async (req, res) => {
    const guideId = req.params.id;
    const {  total,partysize,tourdate,time,guidename } = req.body;

    const updateGuide = {
        total,
        partysize,
        tourdate,
        time,
        guidename
    };

    try {
        const updatedGuide = await Guide.findByIdAndUpdate(guideId, updateGuide, { new: true });
        if (updatedGuide) {
            res.status(200).json({ status: "Guide updated", guide: updatedGuide });
        } else {
            res.status(404).json({ status: "guide not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error updating Guide", error: err.message });
    }
});

// Delete a booking by ID
router.delete("/delete/:id", async (req, res) => {
    const guideId = req.params.id;

    try {
        const deletedGuide = await Guide.findByIdAndDelete(guideId);
        if (deletedGuide) {
            res.status(200).json({ status: "Guide deleted" });
        } else {
            res.status(404).json({ status: "Guide not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error deleting Guide", error: err.message });
    }
});

// Get a booking by ID
router.get("/get/:id", async (req, res) => {
    const guideId = req.params.id;

    try {
        const guideDetails = await Guide.findById(guideId);
        if (guideDetails) {
            res.status(200).json({ status: "Guide fetched", guide: guideDetails });
        } else {
            res.status(404).json({ status: "guide not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error fetching guide", error: err.message });
    }
});

module.exports = router;
