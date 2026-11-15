import React from 'react';

export default function Navbar({ activeTab, setActiveTab, cartCount, orderStatus }) {
    return (
        <nav style={styles.nav}>
            <h2 style={styles.logo}>The Awesome Restaurant</h2>
            <div style={styles.links}>
                <button
                    onClick={() => setActiveTab('menu')}
                    style={{ ...styles.linkBtn, fontWeight: activeTab === 'menu' ? 'bold' : 'normal' }}
                >
                    Menu & Ordering
                </button>
                <button
                    onClick={() => setActiveTab('reservations')}
                    style={{ ...styles.linkBtn, fontWeight: activeTab === 'reservations' ? 'bold' : 'normal' }}
                >
                    Book a Table
                </button>
                {orderStatus && (
                    <button
                        onClick={() => setActiveTab('status')}
                        style={{ ...styles.linkBtn, color: '#88ff6a', fontWeight: 'bold' }}
                    >
                        Active Order Status
                    </button>
                )}
                <button
                    onClick={() => setActiveTab('admin')}
                    style={{
                        ...styles.linkBtn,
                        backgroundColor: '#227de6',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        color: '#fff'
                    }}
                >
                    Admin Dashboard
                </button>
            </div>
            <button onClick={() => setActiveTab('cart')} style={styles.cartBtn}>
                Cart ({cartCount})
            </button>
        </nav>
    );
}

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        backgroundColor: '#2c3e50',
        color: '#fff',
        borderRadius: '8px',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '12px'
    },
    logo: {
        margin: 0,
        fontSize: '1.4rem'
    },
    links: {
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    linkBtn: {
        background: 'none',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '1rem'
    },
    cartBtn: {
        backgroundColor: '#27ae60',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold'
    }
};