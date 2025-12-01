import multer from "multer"; // File uplaod
import path from 'path' // extention .png , .jpg

const storage = multer.diskStorage({
    destination: (req, file, cb) => { // cb => call back
        cb(null, "uploads/products/");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

const upload = multer({
    storage
});

export {upload};

