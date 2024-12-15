import React from 'react';
import AppNavBar from "../components/UI/Navbar";

const Home = () => {
    return (
        <div>
            <AppNavBar/>
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1>Welcome to the Task Manager</h1>
                <p>We help you start Organizing your tasks effectively</p>
            </div>
        </div>
    );
}

export default Home;