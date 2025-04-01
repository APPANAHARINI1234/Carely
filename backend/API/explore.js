const express = require("express");
const { ObjectId } = require("mongodb");

module.exports = function (exploreCollection, healthTipsCollection) {
    const router = express.Router();

    // Route to get all diseases
    router.get("/", async (req, res) => {
        try {
            const diseases = await exploreCollection.find().toArray();

            // Ensure category exists in all diseases
            const updatedDiseases = diseases.map(disease => ({
                ...disease,
                category: disease.category || "Not Available"
            }));

            res.json({ success: true, data: updatedDiseases });
        } catch (error) {
            console.error("Error fetching diseases:", error);
            res.status(500).json({ success: false, message: "Error fetching diseases", error: error.message });
        }
    });

    // Route to get a single disease (by ID)
    router.get("/:id", async (req, res) => {
        try {
            const disease = await exploreCollection.findOne({ _id: new ObjectId(req.params.id) });

            if (!disease) {
                return res.status(404).json({ success: false, message: "Disease not found" });
            }

            disease.category = disease.category || "Not Available";
            res.json({ success: true, data: disease });
        } catch (error) {
            console.error("Error fetching disease details:", error);
            res.status(500).json({ success: false, message: "Error fetching disease details", error: error.message });
        }
    });

    // Route to get a random health tip
    router.get("/healthTips/random", async (req, res) => {
        try {
            const randomTip = await healthTipsCollection.aggregate([{ $sample: { size: 1 } }]).toArray();

            if (randomTip.length > 0) {
                res.json({ success: true, tip: randomTip[0].tip });
            } else {
                res.json({ success: false, message: "No health tips available at the moment." });
            }
        } catch (error) {
            console.error("Error fetching health tip:", error);
            res.status(500).json({ success: false, message: "Failed to fetch health tip", error: error.message });
        }
    });

    return router;
};
