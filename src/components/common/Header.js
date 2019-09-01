import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

    return (
        <div className="banner">
            <Link className="banner-item" to="/">Back to home</Link>
        </div>
    )
}

export default Header;