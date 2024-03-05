import { getDataFromToken } from "@/helpers/getDataFromToken";
import {NextRequest,NextResponse} from "next/server";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";

connect();

export async function GET (request:NextRequest){
    try{
        const userId = await getDataFromToken(request);
        // Here the code means give everything except the password for multiple fields
        // it can be written as follows:
        // const user = await User.findOne({_id:userId}).select("-password -email -name")
        const user = await User.findOne({_id:userId}).select("-password");
        return NextResponse.json({
            message:"User found",
            data:user
        })
    } catch (error : any){
        return NextResponse.json({error:error.message},{status:400});
    }
}