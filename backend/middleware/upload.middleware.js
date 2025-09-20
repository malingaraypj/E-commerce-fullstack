import multer from "multer";
import path from "path";

// configure storage
const storage = multer.storage({
  destination: (req, file, cb) => {
    cb(null, "uploads/others");
  },
  filename: (req, file, cb) => {
    console.log(file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(file.fieldname + "-" + uniqueSuffix + ext);
  },
});

export const upload = multer({ storage });
