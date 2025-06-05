import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import { AppError } from './app-error.js';

// Multer config
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
  },
});

// Cloudinary upload function
export const uploadToCloudinary = async (file) => {
  try {
    const b64 = Buffer.from(file.buffer).toString('base64');
    const dataURI = `data:${file.mimetype};base64,${b64}`;
    
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'auto',
    });
    
    return result.secure_url;
  } catch (error) {
    throw new AppError('Error uploading file to Cloudinary', 500);
  }
};

export const uploadMiddleware = upload.single('image');