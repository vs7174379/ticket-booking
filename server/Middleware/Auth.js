import { clerkClient } from "@clerk/express";

export const protectAdmin = async(req,res,next) => {
    try {
        const {userId} = req.auth();
        const user = await clerkClient.users.getUser(userId);
        if(user.privateMetadata.role !== 'admin') {
            res.json({success : false,message: "Not Authorized"},user);
        }
        console.log(user.privateMetadata)
        next();
    } catch (error) {
        const {userId} = req.auth();
        const user = await clerkClient.users.getUser(userId);
        res.json({success : false,message: "Not Authorized"},user);
    }
}