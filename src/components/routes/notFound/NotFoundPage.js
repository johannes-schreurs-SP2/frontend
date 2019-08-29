import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div>
            404 - <Link to="/">Go back to home</Link>
        </div>
    );
}

export default NotFoundPage;