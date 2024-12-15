import React from 'react';
import { Link } from 'react-router-dom';

const NotFound =() => (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
            Go Back to Home
        </Link>
    </div>
);

export default NotFound;