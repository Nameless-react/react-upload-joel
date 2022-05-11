import post from "../models/schema.js";
import fs from "fs-extra";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";

export async function getPosts(req, res) {   
    try {
        const posts = await post.find()
        res.send(posts)
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

export async function newPost(req, res) {
    try {
        const { title, description } = req.body;
        let image = null;
        if (req.files?.image) {
            const response = await uploadImage(req.files.image.tempFilePath);
            await fs.remove(req.files.image.tempFilePath);
            image = {
                url: response.secure_url,
                public_id: response.public_id
            };
        }

        const newPost = new post({
            title,
            description,
            image
        });
        await newPost.save();

        return res.json(newPost);
    } catch (error) {
        return  res.status(500).json({
            msg: error.message
        });
    }
}

export async function updatePost(req, res) {
    try {
        const id = req.params.id;
        let image = null;

        if (req.files?.image) {
            const response = await uploadImage(req.files.image.tempFilePath);
            await fs.remove(req.files.image.tempFilePath);
            image = {
                url: response.secure_url,
                public_id: response.public_id
            };
        }
    
        const updatedPost = await post.findByIdAndUpdate(id, { ...req.body, image }, {new: true});
        if(!updatePost) return res.sendStatus(404);
    
        return res.json(updatedPost);
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });        
    }
}

export async function deletePost(req, res) {
    try {
        const id = req.params.id;
        const deletedPost = await post.findByIdAndDelete(id);

        if (!deletedPost) return res.sendStatus(404);
        
        if (deletedPost.image.public_id) {
            await deleteImage(deletedPost.image.public_id);
        }

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });        
    }
}

export async function getPost(req, res) {
    try {
        const id = req.params.id;
    
        const getPost = await post.findById(id);
        if(!getPost) return res.sendStatus(404);
        
        return res.json(getPost);
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });        
    }
}

