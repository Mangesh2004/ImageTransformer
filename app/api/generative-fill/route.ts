// import { v2 as cloudinary } from 'cloudinary';
// import { NextRequest, NextResponse } from 'next/server';
// import { auth } from '@clerk/nextjs/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// cloudinary.config({
//     cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET,
// });

// interface CloudinaryUploadResult {
//     public_id: string;
//     bytes: number;
//     [key: string]: any;
// }

// export async function POST(req: NextRequest) {
//     const { userId } = auth();

//     if (!userId) {
//         return NextResponse.json({ error: "Unauthorized access" }, { status: 400 });
//     }

//     try {
//         const formData = await req.formData();
//         const file = formData.get("file") as File | null;
//         const title = formData.get("title") as string;
//         const description = formData.get("description") as string;
//         const originalSize = formData.get("originalSize") as string;

//         if (!file) {
//             return NextResponse.json({ error: "File not found" });
//         }

//         const bytes = await file.arrayBuffer();
//         const buffer = Buffer.from(bytes);

//         // Cloudinary upload for image with generative fill transformation
//         const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
//             const uploadStream = cloudinary.uploader.upload_stream(
//                 {
//                     folder: "Image-uploads",
//                     resource_type: "image",
//                     transformation: [
//                         {
//                             crop: "pad",
//                             width: 960,
//                             height: 600,
//                             background: "auto",
//                             fetch_format: "auto",
//                             quality: "auto",
//                             generative_fill: true, // Generative fill option
//                         },
//                     ],
//                 },
//                 (error, result) => {
//                     if (error) {
//                         reject(error);
//                     } else {
//                         resolve(result as CloudinaryUploadResult);
//                     }
//                 }
//             );
//             uploadStream.end(buffer);
//         });
//         //@ts-ignore
//         const image = await prisma.image.create({
//             data: {
//                 title,
//                 description,
//                 publicId: result.public_id,
//                 originalSize: originalSize,
//                 compressedSize: String(result.bytes),
//             },
//         });

//         return NextResponse.json(image);
//     } catch (error) {
//         console.log("Upload image failed", error);
//         return NextResponse.json({ error: "Upload failed" });
//     } finally {
//         await prisma.$disconnect();
//     }
// }
