 import { v2 } from "cloudinary";
 import { config } from "dotenv";
 import path from "path";
const __dirname = path.resolve();

config({
    path: __dirname + "/.env.local"
})

v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})


export async function uploadImage (path) {
    return await v2.uploader.upload(path, {
        folder: "posts"
    })
}

export async function deleteImage (id) {
    return await v2.uploader.destroy(id, {
        folder: "posts"
    })
}