import { NextFetchEvent,NextRequest, NextResponse } from "next/server";
import {getToken} from 'next-auth/jwt'
import { jwt } from "../../utils";



export async function middleware(req:NextRequest | any,event:NextFetchEvent){

    const session = await getToken({req,secret:process.env.NEXTAUTH_SECRET})

    const requestedPage = req.page.name

    if(!session){
        return NextResponse.redirect(`http://localhost:3000/auth/login?p=${requestedPage}`);
    }


    return NextResponse.next();

}