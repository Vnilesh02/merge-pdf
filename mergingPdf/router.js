const express = require("express");
const multer = require("multer");
const { finalPdf } = require("../mergingPdf/pdfService");

const router = express.Router();

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint to handle PDF file uploads
router.post("/pdf", upload.array("file", 2), finalPdf);
router.get("/", (req, res) => {
    res.send("App is running..");
});

module.exports = router;
