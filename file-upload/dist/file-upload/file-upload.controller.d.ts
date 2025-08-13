import { FileUploadService } from './file-upload.service';
export declare class FileUploadController {
    private readonly fileUploadService;
    constructor(fileUploadService: FileUploadService);
    uploadFile(file: Express.Multer.File): Promise<{
        id: string;
        filename: string;
        publicId: string;
        url: string;
        createAt: Date;
        updatedAt: Date;
    }>;
}
