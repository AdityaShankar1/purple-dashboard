// server/src/config/upload.js
import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";

const ALLOWED_MIME = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // pptx
  "text/plain",
  "application/vnd.ms-powerpoint", // ppt
  "application/msword", // doc
];

const baseDir = path.resolve("uploads/assignments");
if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, baseDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`);
  },
});

export const questionUpload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME.includes(file.mimetype)) return cb(new Error("Invalid file type"));
    cb(null, true);
  },
});

export const submissionUpload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB per file
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME.includes(file.mimetype)) return cb(new Error("Invalid file type"));
    cb(null, true);
  },
});

// Optional encryption-at-rest (AES-256-GCM) wrapper
export const encryptFileAtRest = (filePath, key = process.env.FILE_ENCRYPTION_KEY) => {
  if (!key) return; // skip if not configured
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", crypto.createHash("sha256").update(key).digest(), iv);
  const input = fs.createReadStream(filePath);
  const outPath = `${filePath}.enc`;
  const output = fs.createWriteStream(outPath);

  return new Promise((resolve, reject) => {
    input.pipe(cipher).pipe(output)
      .on("finish", () => {
        fs.unlinkSync(filePath); // remove plaintext
        resolve(outPath);
      })
      .on("error", reject);
  });
};
