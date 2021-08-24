const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { body, validationResult } = require("express-validator");

const Job = require("../../models/Job");

// @route       POST api/jobs
// @desc        Create or Update Job
// @access      Private
router.post(
  "/",
  auth,
  [
    body("jobName", "Job name is required").not().isEmpty(),
    body("jobCost", "Job Cost is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, jobName, jobCost } = req.body;

    const jobField = {};
    if (id) jobField.id = id;
    jobField.jobName = jobName;
    jobField.jobCost = jobCost;

    try {
      let job = await Job.findOne({ jobName });

      if (id) {
        // Update
        job = await Job.findOneAndUpdate(
          { _id: id },
          { $set: jobField },
          { new: true }
        );
        return res.json(job);
      }

      if (job) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Job already exists" }] });
      }

      // Create
      job = new Job({
        jobName,
        jobCost,
      });

      await job.save();

      res.json(job);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route       GET api/jobs
// @desc        Get all Jobs
// @access      Public
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       GET api/jobs/:id
// @desc        Get Job by ID
// @access      Private
router.get("/:id", auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    res.json(job);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Job not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route       DELETE api/jobs/:id
// @desc        Delete a job
// @access      Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    await job.remove();

    res.json({ msg: "job removed" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Job not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
