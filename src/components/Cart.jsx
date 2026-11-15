import React, { useState } from 'react';

export default function CartDrawer({ cart, onUpdateQuantity, onCheckout, onBackToMenu }) {
    const [orderType, setOrderType] = useState('Delivery');
    const [customerName, setCustomerName] = useState('');
    const [address, setAddress] = useState('');

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = orderType === 'Delivery' ? 4.99 : 0;
    const total = subtotal + (subtotal > 0 ? deliveryFee : 0);

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        if (!customerName.trim()) {
            alert('Please enter your name for the order confirmation.');
            return;
        }
        if (orderType === 'Delivery' && !address.trim()) {
            alert('Please provide a delivery address.');
            return;
        }
        onCheckout({
            id: 'ORD-' + 1,
            customerName,
            orderType,
            address: orderType === 'Delivery' ? address : 'Pickup at Restaurant',
            items: cart,
            total,
            status: 'Preparing',
            createdAt: new Date().toLocaleTimeString()
        });
    };

    return (
        <div style={styles.container}>
            <h2>Your Shopping Cart</h2>
            <button onClick={onBackToMenu} style={styles.backBtn}>← Back to Menu</button>

            {cart.length === 0 ? (
                <p style={styles.empty}>Your cart is currently empty.</p>
            ) : (
                <div style={styles.cartContent}>
                    <div style={styles.itemList}>
                        {cart.map((item) => (
                            <div key={item.id} style={styles.cartItem}>
                                <div>
                                    <h4>{item.name}</h4>
                                    <p style={styles.itemPrice}>${item.price.toFixed(2)} each</p>
                                </div>
                                <div style={styles.qtyControls}>
                                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} style={styles.qtyBtn}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} style={styles.qtyBtn}>+</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handlePlaceOrder} style={styles.checkoutForm}>
                        <h3>Order Details</h3>

                        <div style={styles.formGroup}>
                            <label>Full Name:</label>
                            <input
                                type="text"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                placeholder="Enter your name"
                                style={styles.input}
                                required
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label>Order Type:</label>
                            <div style={styles.radioGroup}>
                                <label>
                                    <input
                                        type="radio"
                                        name="orderType"
                                        value="Delivery"
                                        checked={orderType === 'Delivery'}
                                        onChange={() => setOrderType('Delivery')}
                                    /> Delivery ($4.99)
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="orderType"
                                        value="Pickup"
                                        checked={orderType === 'Pickup'}
                                        onChange={() => setOrderType('Pickup')}
                                    /> Pickup (Free)
                                </label>
                            </div>
                        </div>

                        {orderType === 'Delivery' && (
                            <div style={styles.formGroup}>
                                <label>Delivery Address:</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Street address, apartment, city"
                                    style={styles.input}
                                    required
                                />
                            </div>
                        )}

                        <div style={styles.summaryBox}>
                            <p>Subtotal: <span>${subtotal.toFixed(2)}</span></p>
                            <p>{orderType} Fee: <span>${deliveryFee.toFixed(2)}</span></p>
                            <hr />
                            <h4>Total: <span>${total.toFixed(2)}</span></h4>
                        </div>

                        <button type="submit" style={styles.checkoutBtn}>Place Order Now</button>
                    </form>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '24px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    },
    backBtn: {
        background: 'none',
        border: 'none',
        color: '#3498db',
        cursor: 'pointer',
        fontSize: '0.9rem',
        marginBottom: '16px'
    },
    empty: {
        textAlign: 'center',
        color: '#666',
        padding: '40px'
    },
    cartContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    },
    itemList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    cartItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px',
        borderBottom: '1px solid #eee'
    },
    itemPrice: {
        margin: '4px 0 0 0',
        color: '#666',
        fontSize: '0.85rem'
    },
    qtyControls: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    qtyBtn: {
        width: '28px',
        height: '28px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        backgroundColor: '#f9f9f9',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    checkoutForm: {
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #e0e0e0'
    },
    formGroup: {
        marginBottom: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
    },
    input: {
        padding: '8px 12px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '0.95rem'
    },
    radioGroup: {
        display: 'flex',
        gap: '24px',
        marginTop: '4px'
    },
    summaryBox: {
        margin: '16px 0',
        padding: '12px',
        backgroundColor: '#fff',
        borderRadius: '6px',
        border: '1px solid #ddd'
    },
    checkoutBtn: {
        width: '100%',
        backgroundColor: '#27ae60',
        color: '#fff',
        border: 'none',
        padding: '12px',
        borderRadius: '6px',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer'
    }
};