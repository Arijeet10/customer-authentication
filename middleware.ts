import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(req:NextRequest){
    
    const path=req.nextUrl.pathname

    //set public path to access when no token
    const isPublicPath=path==="/login" || path === "/register" || path==="verify"

    //get token 
    const token=req.cookies.get("token")?.value || ""

    //access homepage when token is available
    if(isPublicPath && token){
        return NextResponse.redirect(new URL("/",req.nextUrl))
    }

    //go to login page by default if no token available 
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL("/login",req.nextUrl))
    }

}



// Matching Paths
export const config = {
    matcher: [
      '/',
      '/verify',
      '/login',
      '/register'
    ]
  }
