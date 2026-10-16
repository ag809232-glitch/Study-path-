
import express from "express";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";

const app = express();

app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 3000;

function getFirebaseDatabase() {
  if (!getApps().length) {
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT
    );

    initializeApp({
      credential: cert(serviceAccount),
      databaseURL:
        "https://study-path-d56a5-default-rtdb.asia-southeast1.firebasedatabase.app"
    });
  }

  return getDatabase();
}

app.get("/", (req, res) => {
  res.send("Study Path Backend is running!");
});

app.post("/applications", async (req, res) => {
  try {
    const { studentName, fatherName, dob, education, photo, signature } =
      req.body;

    if (
      !studentName ||
      !fatherName ||
      !dob ||
      !education ||
      !photo ||
      !signature
    ) {
      return res.status(400).json({
        error: "Please provide all required form details."
      });
    }

    const database = getFirebaseDatabase();
    const newApplication = database.ref("applications").push();

    await newApplication.set({
      studentName,
      fatherName,
      dob,
      education,
      photo,
      signature,
      submittedAt: new Date().toISOString()
    });

    res.status(201).json({
      message: "Application saved successfully.",
      receiptId: newApplication.key
    });
  } catch (error) {
    console.error("Application save failed:", error.message);
    res.status(500).json({
      error: "Could not save the application."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
