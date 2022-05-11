import React, { useState, createContext, useContext, useEffect } from "react"
import Nav from "../components/nav";
import toast from "react-hot-toast";

const context = createContext()
export const usePosts = () => useContext(context)

export default function Layout ({ children }) {
    const [posts, setPosts] = useState([]);
   
    const createPost = async (post) => {
        try {
            const form = new FormData();
            for (let key in post) {
                form.append(key, post[key]);
            }
            
            const response = await fetch("/posts", {
                method: "POST",
                body: form
            })
            const data = await response.json();
            setPosts(prevValue => [...prevValue, data])
        } catch (error) {
            console.error(error);
        }
    }

    const deletePost = async (id) => {
        const response = await fetch(`/posts/${id}`, {
            method: "DELETE",
        });
        if (response.status === 204) {
            setPosts(prevValue => prevValue.filter(post => post._id !== id))
        } else {
            toast.error("Post not deleted")
        }
    }

    const updatePost = async (NewPostData) => {
        const form = new FormData();
            for (let key in NewPostData) {
                form.append(key, NewPostData[key]);
            }
        const response = await fetch(`/posts/${NewPostData._id}`, {
            method: "PUT",
            body: form
        })
        const data = await response.json();
        setPosts(prevValue => prevValue.map(post => post._id === NewPostData._id ? {...post, description: data.description, image: data.image, title: data.title } : post))
    }

    const getPost = async (id) => {
        const response = await fetch(`/posts/${id}`, {
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        return data;
    };

    useEffect(() => {
        const getPosts = async () => {
            const reponse = await fetch("/posts");
            const data = await reponse.json();
            setPosts(data);
        };

        getPosts();
    }, [])
    
    return (
        <context.Provider value={{
            posts,
            createPost,
            deletePost,
            updatePost,
            getPost
        }}>
            <Nav />
            {children}
        </context.Provider>
    )
}