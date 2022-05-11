import React from 'react'
import { VscEdit } from "react-icons/vsc";
import { TiDelete } from "react-icons/ti";
import toast from "react-hot-toast";
import { usePosts } from '../context/postContext';
import { useNavigate } from 'react-router-dom';

export default function Cards({ _id, title, description, image }) {
    const { deletePost } = usePosts();
    const navigate = useNavigate();

    const handleDelete = (id) => {
        toast.success("Post deleted successfully");
        deletePost(id)
    }
    
    return (
        <div className="post" key={_id}>
                <div className="hover-options">
                    <VscEdit onClick={() => navigate(`/edit/${_id}`)}/>
                    <TiDelete onClick={() => handleDelete(_id)}/>
                </div>
                <h3>{title}</h3>
                <div className="content">
                   <p>{description}</p>
                </div>
                {image && <img src={image.url} alt="img"/>}
        </div>
    )
}