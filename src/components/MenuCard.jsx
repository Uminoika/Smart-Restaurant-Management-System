import React from 'react';

export default function MenuCard({ item, onAddToCart }) {
    return (
        <div style={styles.card}>
            <div>
                <div style={styles.header}>
                    <span style={styles.categoryBadge}>{item.category}</span>
                    <span style={styles.price}>${item.price.toFixed(2)}</span>
                </div>

                <h3 style={styles.title}>{item.name}</h3>
                <p style={styles.description}>{item.description}</p>

                <p style={styles.ingredients}>
                    <strong>Ingredients:</strong> {item.ingredients.join(', ')}
                </p>

                {item.dietary.length > 0 && (
                    <div style={styles.dietaryContainer}>
                        {item.dietary.map((tag) => (
                            <span key={tag} style={styles.dietaryBadge}>{tag}</span>
                        ))}
                    </div>
                )}
            </div>

            <div style={styles.footer}>
                <button onClick={() => onAddToCart(item)} style={styles.addBtn}>
                    + Add to Cart
                </button>
            </div>
        </div>
    );
}

const styles = {
    card: {
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '18px',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px'
    },
    categoryBadge: {
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#666',
        backgroundColor: '#f0f0f0',
        padding: '4px 8px',
        borderRadius: '4px'
    },
    price: {
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#2c3e50'
    },
    title: {
        margin: '0 0 8px 0',
        fontSize: '1.25rem',
        color: '#725858'
    },
    description: {
        margin: '0 0 12px 0',
        fontSize: '0.9rem',
        color: '#555',
        lineHeight: '1.4'
    },
    ingredients: {
        margin: '0 0 12px 0',
        fontSize: '0.85rem',
        color: '#777'
    },
    dietaryContainer: {
        display: 'flex',
        gap: '6px',
        flexWrap: 'wrap',
        marginBottom: '16px'
    },
    dietaryBadge: {
        fontSize: '0.7rem',
        backgroundColor: '#e8f5e9',
        color: '#2e7d32',
        padding: '3px 8px',
        borderRadius: '10px',
        fontWeight: '600'
    },
    footer: {
        marginTop: '16px',
        paddingTop: '14px',
        borderTop: '1px solid #f0f0f0',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    addBtn: {
        width: '100%',
        backgroundColor: '#2c3e50',
        color: '#fff',
        border: 'none',
        padding: '10px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '600'
    }
};