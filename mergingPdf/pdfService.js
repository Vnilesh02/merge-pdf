const { PDFDocument } = require("pdf-lib");

async function finalPdf(req, res) {
    try {

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        const pdfsToMerge = [];
        for (let fileKey in req.files) {
            const pdfBuffer = req.files[fileKey].buffer;
            pdfsToMerge.push(pdfBuffer);
        }

        if (pdfsToMerge.length > 0) {
            const mergedPdf = await PDFDocument.create();
            for (const pdfBytes of pdfsToMerge) {
                const pdf = await PDFDocument.load(pdfBytes);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => {
                    mergedPdf.addPage(page);
                });
            }

            const mergedPdfBytes = await mergedPdf.save();
            // Set the correct content length
            res.setHeader("Content-Length", mergedPdfBytes.length);
            res.setHeader("Content-Type", "application/pdf");

            // Send the merged PDF as response
            res.send(Buffer.from(mergedPdfBytes));
        } else {
            console.log("PDFs not found.");
            res.status(400).send("Error: No PDFs uploaded.");
        }
    } catch (error) {
        console.error("Error while merging PDFs:", error);
        res.status(500).send("Error: " + error.message);
    }
}

module.exports = { finalPdf };
