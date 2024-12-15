import React from 'react';

const Loader = () => (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <div className="loader"></div>
        <p>Loading...</p>
    </div>
);

export default Loader;

// Add CSS for the loader in src/index.css or a dedicated CSS file
// .loader {
//   border: 4px solid #f3f3f3;
//   border-radius: 50%;
//   border-top: 4px solid #3498db;
//   width: 40px;
//   height: 40px;
//   animation: spin 1s linear infinite;
// }
// @keyframes spin {
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// }
