require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const port = process.env.PORT || 3002;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

app.post("/user_info", async (req, res) => {
  const { name, date_of_birth, phone_number } = req.body;

  const { data, error } = await supabase
    .from("user_info")
    .insert({ name, date_of_birth, phone_number })
    .select("*");

  if (error) {
    console.error("Supabase insert failed:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });

    return res.status(400).json({
      message: "Failed to save user information",
      error: error.message,
    });
  }

  res.status(201).json({ message: "User information saved", data });
});

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});