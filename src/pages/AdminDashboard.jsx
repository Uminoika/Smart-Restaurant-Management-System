import React, { useState } from 'react';

export default function AdminDashboard({
    menuItems,
    onAddMenuItem,
    onUpdateMenuItem,
    onDeleteMenuItem,
    orders,
    onUpdateOrderStatus,
    reservations,
    onUpdateReservationStatus
}) {
    const [adminTab, setAdminTab] = useState('menu'); // 'menu' | 'orders' | 'reservations' | 'analytics'

    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Mains');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [dietary, setDietary] = useState('None');

    const handleOpenEdit = (item) => {
        setIsEditing(true);
        setCurrentId(item.id);
        setName(item.name);
        setCategory(item.category);
        setPrice(item.price);
        setDescription(item.description);
        setIngredients(item.ingredients.join(', '));
        setDietary(item.dietary.join(', ') || 'None');
    };

    const handleResetForm = () => {
        setIsEditing(false);
        setCurrentId(null);
        setName('');
        setCategory('Mains');
        setPrice('');
        setDescription('');
        setIngredients('');
        setDietary('None');
    };

    const handleMenuSubmit = (e) => {
        e.preventDefault();
        const formattedItem = {
            id: isEditing ? currentId : Date.now(),
            name,
            category,
            price: Number(price),
            description,
            ingredients: ingredients.split(',').map((i) => i.trim()).filter(Boolean),
            dietary: dietary === 'None' ? [] : dietary.split(',').map((d) => d.trim()),
            isAvailable: true
        };

        if (isEditing) {
            onUpdateMenuItem(formattedItem);
        } else {
            onAddMenuItem(formattedItem);
        }
        handleResetForm();
    };

    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const totalOrdersCount = orders.length;
    const totalReservationsCount = reservations.length;

    return (
        <div style={styles.container}>
            <div style={styles.headerRow}>
                <h2>Admin Management Dashboard</h2>
                <div style={styles.adminTabs}>
                    <button
                        onClick={() => setAdminTab('menu')}
                        style={{ ...styles.tabBtn, backgroundColor: adminTab === 'menu' ? '#2c3e50' : '#e4e7eb', color: adminTab === 'menu' ? '#fff' : '#333' }}
                    >
                        Menu CRUD ({menuItems.length})
                    </button>
                    <button
                        onClick={() => setAdminTab('orders')}
                        style={{ ...styles.tabBtn, backgroundColor: adminTab === 'orders' ? '#2c3e50' : '#e4e7eb', color: adminTab === 'orders' ? '#fff' : '#333' }}
                    >
                        Orders ({orders.length})
                    </button>
                    <button
                        onClick={() => setAdminTab('reservations')}
                        style={{ ...styles.tabBtn, backgroundColor: adminTab === 'reservations' ? '#2c3e50' : '#e4e7eb', color: adminTab === 'reservations' ? '#fff' : '#333' }}
                    >
                        Reservations ({reservations.length})
                    </button>
                    <button
                        onClick={() => setAdminTab('analytics')}
                        style={{ ...styles.tabBtn, backgroundColor: adminTab === 'analytics' ? '#2c3e50' : '#e4e7eb', color: adminTab === 'analytics' ? '#fff' : '#333' }}
                    >
                        Analytics & Reports
                    </button>
                </div>
            </div>

            {adminTab === 'menu' && (
                <div style={styles.section}>
                    <div style={styles.subHeader}>
                        <h3>Manage Menu Items (Real-Time Availability)</h3>
                    </div>

                    <form onSubmit={handleMenuSubmit} style={styles.formCard}>
                        <h4>{isEditing ? 'Edit Menu Item' : 'Add New Menu Item'}</h4>
                        <div style={styles.formGrid}>
                            <input
                                type="text"
                                placeholder="Item Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={styles.input}
                            />
                            <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.input}>
                                <option value="Starters">Starters</option>
                                <option value="Mains">Mains</option>
                                <option value="Desserts">Desserts</option>
                                <option value="Beverages">Beverages</option>
                            </select>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="Price ($)"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                style={styles.input}
                            />
                            <input
                                type="text"
                                placeholder="Dietary (e.g. Vegetarian, Gluten-Free or None)"
                                value={dietary}
                                onChange={(e) => setDietary(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Description"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ ...styles.input, width: '100%', marginTop: '10px' }}
                        />
                        <input
                            type="text"
                            placeholder="Ingredients (comma separated)"
                            required
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            style={{ ...styles.input, width: '100%', marginTop: '10px' }}
                        />
                        <div style={{ marginTop: '12px', display: 'flex', gap: '10px' }}>
                            <button type="submit" style={styles.actionBtn}>
                                {isEditing ? 'Update Item' : 'Create Item'}
                            </button>
                            {isEditing && (
                                <button type="button" onClick={handleResetForm} style={styles.cancelBtn}>
                                    Cancel Edit
                                </button>
                            )}
                        </div>
                    </form>

                    <div style={styles.tableWrapper}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Name</th>
                                    <th style={styles.th}>Category</th>
                                    <th style={styles.th}>Price</th>
                                    <th style={styles.th}>Availability</th>
                                    <th style={styles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {menuItems.map((item) => (
                                    <tr key={item.id} style={styles.tr}>
                                        <td style={styles.td}><strong>{item.name}</strong></td>
                                        <td style={styles.td}>{item.category}</td>
                                        <td style={styles.td}>${item.price.toFixed(2)}</td>
                                        <td style={styles.td}>
                                            <button
                                                onClick={() => onUpdateMenuItem({ ...item, isAvailable: !item.isAvailable })}
                                                style={{
                                                    ...styles.statusBadgeBtn,
                                                    backgroundColor: item.isAvailable ? '#d4edda' : '#f8d7da',
                                                    color: item.isAvailable ? '#155724' : '#721c24'
                                                }}
                                            >
                                                {item.isAvailable ? 'Available' : 'Sold Out'}
                                            </button>
                                        </td>
                                        <td style={styles.td}>
                                            <button onClick={() => handleOpenEdit(item)} style={styles.editBtn}>Edit</button>
                                            <button onClick={() => onDeleteMenuItem(item.id)} style={styles.delBtn}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {adminTab === 'orders' && (
                <div style={styles.section}>
                    <h3>Monitor & Update Incoming Orders</h3>
                    {orders.length === 0 ? (
                        <p style={styles.empty}>No customer orders placed yet.</p>
                    ) : (
                        <div style={styles.orderGrid}>
                            {orders.map((order) => (
                                <div key={order.id} style={styles.orderCard}>
                                    <div style={styles.orderHeader}>
                                        <strong>{order.id}</strong>
                                        <span style={styles.timeTag}>{order.createdAt}</span>
                                    </div>
                                    <p>Customer: <strong>{order.customerName}</strong></p>
                                    <p>Type: <strong>{order.orderType}</strong> ({order.address})</p>
                                    <ul style={styles.orderItemList}>
                                        {order.items.map((i, idx) => (
                                            <li key={idx}>{i.name} x {i.quantity}</li>
                                        ))}
                                    </ul>
                                    <p style={styles.orderTotal}>Total: ${order.total.toFixed(2)}</p>

                                    <div style={styles.statusActionRow}>
                                        <span>Status: </span>
                                        <select
                                            value={order.status}
                                            onChange={(e) => onUpdateOrderStatus(order.id, e.target.value)}
                                            style={styles.statusSelect}
                                        >
                                            <option value="Preparing">Preparing</option>
                                            <option value="Ready">Ready</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {adminTab === 'reservations' && (
                <div style={styles.section}>
                    <h3>Table & Special Event Bookings</h3>
                    {reservations.length === 0 ? (
                        <p style={styles.empty}>No reservations submitted yet.</p>
                    ) : (
                        <div style={styles.tableWrapper}>
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={styles.th}>Booking ID</th>
                                        <th style={styles.th}>Name</th>
                                        <th style={styles.th}>Event Type</th>
                                        <th style={styles.th}>Date & Time</th>
                                        <th style={styles.th}>Guests</th>
                                        <th style={styles.th}>Status</th>
                                        <th style={styles.th}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservations.map((res) => (
                                        <tr key={res.id} style={styles.tr}>
                                            <td style={styles.td}><strong>{res.id}</strong></td>
                                            <td style={styles.td}>{res.name} ({res.email})</td>
                                            <td style={styles.td}>{res.eventType}</td>
                                            <td style={styles.td}>{res.date} @ {res.time}</td>
                                            <td style={styles.td}>{res.guests}</td>
                                            <td style={styles.td}>
                                                <span
                                                    style={{
                                                        padding: '4px 8px',
                                                        borderRadius: '4px',
                                                        fontWeight: 'bold',
                                                        backgroundColor: res.status === 'Approved' ? '#d4edda' : res.status === 'Canceled' ? '#f8d7da' : '#fff3cd',
                                                        color: res.status === 'Approved' ? '#155724' : res.status === 'Canceled' ? '#721c24' : '#856404'
                                                    }}
                                                >
                                                    {res.status || 'Pending'}
                                                </span>
                                            </td>
                                            <td style={styles.td}>
                                                <button
                                                    onClick={() => onUpdateReservationStatus(res.id, 'Approved')}
                                                    style={styles.approveBtn}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => onUpdateReservationStatus(res.id, 'Canceled')}
                                                    style={styles.cancelBookingBtn}
                                                >
                                                    Cancel
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {adminTab === 'analytics' && (
                <div style={styles.section}>
                    <h3>Restaurant Operations Analytics & Summaries</h3>
                    <div style={styles.analyticsGrid}>
                        <div style={styles.metricCard}>
                            <h4>Total Revenue</h4>
                            <p style={styles.metricValue}>${totalRevenue.toFixed(2)}</p>
                        </div>
                        <div style={styles.metricCard}>
                            <h4>Total Orders</h4>
                            <p style={styles.metricValue}>{totalOrdersCount}</p>
                        </div>
                        <div style={styles.metricCard}>
                            <h4>Total Reservations</h4>
                            <p style={styles.metricValue}>{totalReservationsCount}</p>
                        </div>
                        <div style={styles.metricCard}>
                            <h4>Active Menu Items</h4>
                            <p style={styles.metricValue}>{menuItems.filter(i => i.isAvailable).length}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '24px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    },
    headerRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '12px'
    },
    adminTabs: {
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap'
    },
    tabBtn: {
        padding: '8px 14px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '0.9rem'
    },
    section: {
        marginTop: '16px'
    },
    subHeader: {
        marginBottom: '16px'
    },
    formCard: {
        backgroundColor: '#f8f9fa',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        marginBottom: '24px'
    },
    formGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px'
    },
    input: {
        padding: '8px 12px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '0.9rem',
        backgroundColor: '#fff'
    },
    actionBtn: {
        backgroundColor: '#27ae60',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    cancelBtn: {
        backgroundColor: '#95a5a6',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    tableWrapper: {
        overflowX: 'auto'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left',
        fontSize: '0.9rem'
    },
    th: {
        backgroundColor: '#f1f3f5',
        padding: '10px',
        borderBottom: '2px solid #dee2e6',
        color: '#333'
    },
    td: {
        padding: '10px',
        borderBottom: '1px solid #dee2e6'
    },
    tr: {
        backgroundColor: '#fff'
    },
    statusBadgeBtn: {
        padding: '4px 8px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '0.8rem'
    },
    editBtn: {
        backgroundColor: '#3498db',
        color: '#fff',
        border: 'none',
        padding: '4px 8px',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '6px'
    },
    delBtn: {
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        padding: '4px 8px',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    orderGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px'
    },
    orderCard: {
        backgroundColor: '#f8f9fa',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    orderHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.85rem',
        color: '#666'
    },
    orderItemList: {
        margin: '4px 0 8px 16px',
        padding: 0,
        fontSize: '0.9rem',
        color: '#444'
    },
    orderTotal: {
        fontWeight: 'bold',
        color: '#2c3e50',
        marginTop: 'auto'
    },
    statusActionRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginTop: '8px',
        borderTop: '1px solid #eee',
        paddingTop: '8px'
    },
    statusSelect: {
        padding: '4px 8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontWeight: 'bold'
    },
    approveBtn: {
        backgroundColor: '#27ae60',
        color: '#fff',
        border: 'none',
        padding: '4px 8px',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '6px',
        fontWeight: 'bold'
    },
    cancelBookingBtn: {
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        padding: '4px 8px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    analyticsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px'
    },
    metricCard: {
        backgroundColor: '#f8f9fa',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center'
    },
    metricValue: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#2c3e50',
        margin: '8px 0 0 0'
    },
    empty: {
        textAlign: 'center',
        color: '#666',
        padding: '40px'
    }
};