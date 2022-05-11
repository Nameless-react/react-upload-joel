import React from "react"
import { usePosts } from "../context/postContext"
import { VscEmptyWindow } from "react-icons/vsc";
import { Link } from "react-router-dom"
import Cards from "../components/cards";

export default function Home() {
    const { posts } = usePosts();
    
    if(posts.length === 0) {
        return (
            <Link to={"/postform"}>
                <div className="empty">
                    <VscEmptyWindow className="addPost-empty"/>
                    <h2>We do not have posts</h2>
                </div>
            </Link>
        )
    }

    const data = posts.map(post => <Cards 
                                        key={post._id.toString()}
                                        _id={post._id.toString()}
                                        title={post.title}
                                        description={post.description}
                                        image={post.image}
                                    />)


    return (
        <>
            <Link to={"/postform"}><VscEmptyWindow className="addPost" /></Link>
            <div className="posts">
                {data}
            </div>
        </>
    )
}