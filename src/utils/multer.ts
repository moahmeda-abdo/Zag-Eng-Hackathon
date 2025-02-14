import fs from 'fs';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';

interface CustomRequest extends Request {
    file?: multer.Multer.File;
}

const upload = multer({
    storage: multer.diskStorage({
        destination: (req: CustomRequest, file: multer.Multer.File, cb: (error: Error | null, destination: string) => void) => {
            let uploadFolder = 'uploads/';
            if (req.baseUrl.includes('items')) {
                uploadFolder = path.join('uploads', 'items');
            }

            if (!fs.existsSync(uploadFolder)) {
                fs.mkdirSync(uploadFolder, { recursive: true });
            }

            cb(null, uploadFolder);
        },
        filename: (req: CustomRequest, file: multer.Multer.File, cb: (error: Error | null, filename: string) => void) => {
            const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
            cb(null, filename);
        }
    }),
    fileFilter: (req: CustomRequest, file: multer.Multer.File, cb: FileFilterCallback) => {
        cb(null, true);
    }
});

export { upload };
