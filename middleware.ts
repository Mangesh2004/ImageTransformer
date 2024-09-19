import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute=createRouteMatcher([
    "/sign-in","/sign-up", "/",
])

const isPublicApiRoute=createRouteMatcher([
    "/api/videos"
])
export default clerkMiddleware((auth,req)=>{
    const {userId}=auth()
    const currentUrl=new URL(req.url)
    const isAccessingDashboard=currentUrl.pathname==="/"
    const isApirequest=currentUrl.pathname.startsWith("/api")

    if (userId && isPublicRoute(req) && !isAccessingDashboard) {
        return NextResponse.redirect(new URL("/",req.url))
    }

    if(!userId){

        //user not logged in and trying to access the protected routes
        if (!isPublicApiRoute(req) && !isPublicRoute(req)) {
            return NextResponse.redirect(new URL("/sign-in",req.url))
        }

        //for protected api 
        if (isApirequest&&!isPublicApiRoute(req)) {
            return NextResponse.redirect(new URL("/sign-in",req.url))

        }
    }
    return NextResponse.next(
        
    )
});


export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};