import path from 'path';
import { IRequest } from '../api/common/types.common';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req: IRequest, file: any, cb: any) => {
        cb(null, path.join(__dirname, '../../../uploads/products'));
    },
    filename: (req: IRequest, file: any, cb: any) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname as string)); 
    },
});

export const upload = multer({
    storage,
    fileFilter: (req: IRequest, file : any, cb : any) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
});
