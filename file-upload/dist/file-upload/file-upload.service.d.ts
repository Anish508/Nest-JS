import { PrismaService } from 'src/prisma/prisma.service';
export declare class FileUploadService {
    private prisma;
    constructor(prisma: PrismaService);
    uploadFile(file: Express.Multer.File): Promise<{
        id: string;
        filename: string;
        publicId: string;
        url: string;
        createAt: Date;
        updatedAt: Date;
    }>;
    private uploadToCloudinary;
}
