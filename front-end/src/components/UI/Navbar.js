import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav style={{ padding: '10px', backgroundColor: '#282c34', color: 'white' }}>
        <h1>Task Manager</h1>
        <div>
            <Link to="/" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>
                Task Lists
            </Link>
        </div>
    </nav>
);

export default Navbar;
