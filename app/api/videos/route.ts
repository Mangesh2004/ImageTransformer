import {  NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"


const prisma=new PrismaClient();

export async function GET(){
    try {
        const videos=await prisma.video.findMany({
            orderBy:{createdAt:"desc"}
        })
        return NextResponse.json(videos)
    } catch (e) {
        console.log(e);
        
        return NextResponse.json({error:"Something fetching videos"}, {status:500})
    } finally {
        await prisma.$disconnect()
    }
}