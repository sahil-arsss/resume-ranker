const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

const extractTextFromResume = async (filePath, fileType) => {
  if (fileType.includes("pdf")) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  }

  if (fileType.includes("docx")) {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  }

  throw new Error("Unsupported file type ");
};

module.exports = { extractTextFromResume }; 
