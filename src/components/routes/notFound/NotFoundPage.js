import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <h1>
            404 - <Link to="/">Go back to home</Link>
        </h1>
    );
}

export default NotFoundPage;