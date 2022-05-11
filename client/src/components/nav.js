import React from "react"
import { Link } from "react-router-dom"

export default function Nav() {
    return (
        <nav>
            <ul className="nav">
                <li><Link to="/">Home</Link></li>
            </ul>
        </nav>
    )
}