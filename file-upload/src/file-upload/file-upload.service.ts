import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v2 as cloudinary } from 'cloudinary'
import * as fs from 'fs'

@Injectable()
export class FileUploadService {
      constructor(private prisma: PrismaService) {
            cloudinary.config({
                  cloud_name: process.env.CLOUDINARY_NAME,
                  api_key: process.env.CLOUDINARY_API_KEY,
                  api_secret: process.env.CLOUDINARY_API_SECRET
            })
      }

      async uploadFile(file: Express.Multer.File) {
            try {
                  const uploadResult = await this.uploadToCloudinary(file.path)

                  const newlySavedFile = await this.prisma.file.create({
                        data: {
                              filename: file.originalname,
                              publicId: uploadResult.public_id,
                              url: uploadResult.secure_url,

                        }
                  })
                  fs.unlinkSync(file.path)
                  return newlySavedFile
            } catch (error) {
                  //removing in case og any error -> this file from local folder
                  if (file.path && fs.existsSync(file.path))
                        fs.unlinkSync(file.path)
                  console.log('File-upload:',error);
                  throw new InternalServerErrorException('File upload failed please try again...')

            }
      }

      private uploadToCloudinary(filePath: string): Promise<any> {
            return new Promise((resolve, reject) => {
                  cloudinary.uploader.upload(filePath, (err, result) => {
                        if (err) return reject(err)
                        resolve(result)
                  })
            })
      }
      async deleteFile(fileId: string){
            const file = await this.prisma.file.findUnique({
                  where:{
                        id: fileId
                  }
            })
            if(!file){
                  throw new Error("File not found! please try with other file id ")
            }
            await cloudinary.uploader.destroy(file.publicId)
            await this.prisma.file.delete({
                  where : {id: fileId}
            })
            return{
                  message:"File deleted successfully"
            }
      }
}
