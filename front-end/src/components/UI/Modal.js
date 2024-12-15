import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <button onClick={onClose} style={styles.closeButton}>X</button>
                {children}
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        width: '400px',
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        fontSize: '16px',
        cursor: 'pointer',
        position: 'absolute',
        top: '10px',
        right: '10px',
    },
};

export default Modal;
