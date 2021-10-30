const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/adminChangePass", require("./routes/api/adminChangePass"));
app.use("/api/userChangePass", require("./routes/api/userChangePass"));
app.use("/api/updateUser", require("./routes/api/updateUser"));
app.use("/api/typeUsers", require("./routes/api/typeUsers"));
app.use("/api/branchs", require("./routes/api/branchs"));
app.use("/api/jobs", require("./routes/api/jobs"));
app.use("/api/shifts", require("./routes/api/shifts"));
app.use("/api/permissionShiftNumbers", require("./routes/api/permissionShiftNumbers"));
app.use("/api/personInShifts", require("./routes/api/personInShifts"));
app.use("/api/shiftManagers", require("./routes/api/shiftManagers"));
// app.use("/api/shiftRegisters", require("./routes/api/shiftRegisters"));
app.use("/api/shiftRegisters2", require("./routes/api/shiftRegisters2"));
app.use("/api/shiftRegisterManagers", require("./routes/api/shiftRegisterManagers"));
app.use("/api/nextWeekActive", require("./routes/api/nextWeekActive"));
app.use("/api/auth", require("./routes/api/auth"));

// Server static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
