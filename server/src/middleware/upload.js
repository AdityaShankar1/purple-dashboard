// // // import multer from "multer";
// // // import path from "path";
// // // import fs from "fs";

// // // // Ensure uploads folder exists
// // // const uploadDir = path.resolve("uploads");
// // // if (!fs.existsSync(uploadDir)) {
// // //   fs.mkdirSync(uploadDir, { recursive: true });
// // // }

// // // const storage = multer.diskStorage({
// // //   destination: (req, file, cb) => {
// // //     cb(null, uploadDir);
// // //   },
// // //   filename: (req, file, cb) => {
// // //     const ext = path.extname(file.originalname);
// // //     cb(null, `${Date.now()}-${file.fieldname}${ext}`);
// // //   },
// // // });

// // // const fileFilter = (req, file, cb) => {
// // //   const allowedTypes = [".pdf", ".doc", ".docx"];
// // //   const ext = path.extname(file.originalname).toLowerCase();
// // //   cb(null, allowedTypes.includes(ext));
// // // };

// // // export const upload = multer({ storage, fileFilter });















// // // server/src/middleware/upload.js


// // import multer from "multer";
// // import AWS from "aws-sdk";
// // import path from "path";

// // const s3 = new AWS.S3({
// //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
// //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// //   region: process.env.AWS_REGION,
// // });

// // const upload = multer({
// //   storage: multer.memoryStorage(),
// //   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
// //   fileFilter: (req, file, cb) => {
// //     const allowedTypes = /pdf|docx|pptx|txt/i;
// //     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
// //     const mimetype = allowedTypes.test(file.mimetype);
// //     if (mimetype && extname) return cb(null, true);
// //     cb(new Error("Invalid file type. Allowed: PDF, DOCX, PPTX, TXT"));
// //   },
// // });

// // const uploadToS3 = async (req, res, next) => {
// //   if (!req.file) return next();
// //   try {
// //     const params = {
// //       Bucket: process.env.S3_BUCKET,
// //       Key: `assignments/${Date.now()}-${req.file.originalname}`,
// //       Body: req.file.buffer,
// //       ContentType: req.file.mimetype,
// //     };
// //     const { Location } = await s3.upload(params).promise();
// //     req.fileUrl = Location;
// //     next();
// //   } catch (err) {
// //     next(new Error("Upload failed"));
// //   }
// // };

// // export { upload, uploadToS3 };






// import multer from "multer"
// import path from "path"

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname))
//   },
// })

// export const upload = multer({ storage })






import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

export const upload = multer({ storage })
