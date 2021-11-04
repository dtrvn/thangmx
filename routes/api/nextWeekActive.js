const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { body, validationResult } = require("express-validator");

const NextWeekActive = require("../../models/NextWeekActive");

// @route       POST api/nextWeekActive
// @desc        Create Next Week Active
// @access      Private
router.post(
    "/",
    auth,
    async (req, res) => {
        // console.log("tren server "+req.body.currentFirstWeek);
        // const { startDateNextWeek, endDateNextWeek } = req.body;
        const { currentFirstWeek, currentLastWeek } = req.body;
        // console.log("tren server "+JSON.stringify(formData));

        const startDateNextWeek = currentFirstWeek;
        const endDateNextWeek = currentLastWeek;

        try {
            // Create
            let createDate = new NextWeekActive({
                startDateNextWeek,
                endDateNextWeek
            });

            await createDate.save();

            res.json(createDate);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

// @route       GET api/nextWeekActive
// @desc        Lấy ngày mới nhất trong database hiện tại
// @access      Public
router.get("/", async (req, res) => {
    try {
        const createDate = await NextWeekActive.findOne().sort({ dateCreate: -1 });
        res.json(createDate);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route       DELETE api/nextWeekActive/:id
// @desc        Delete a Next Week Active
// @access      Private
router.delete("/:id", auth, async (req, res) => {
    try {
        const createDate = await NextWeekActive.findById(req.params.id);

        if (!createDate) {
            return res.status(404).json({ msg: "Next Week Active not found" });
        }

        await createDate.remove();

        res.json({ msg: "Đã thiết lập huỷ tạo tuần làm việc tiếp theo" });
    } catch (err) {
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Next Week Active not found" });
        }
        res.status(500).send("Server Error");
    }
});

module.exports = router;
