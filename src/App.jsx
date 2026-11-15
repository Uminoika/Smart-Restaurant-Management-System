import React, { useState } from 'react';
import { MENU_ITEMS } from './data/menuData';
import MenuCard from './components/MenuCard';
import Navbar from './components/Navbar';
import CartDrawer from './components/Cart';
import ReservationsPage from './pages/ReservationsPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('menu');
  const [cart, setCart] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dietaryFilter, setDietaryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(25);

  const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Beverages'];
  const dietaryOptions = ['All', 'Vegetarian', 'Gluten-Free'];

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, qty) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.id !== id));
    } else {
      setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
    }
  };

  const handleCheckout = (order) => {
    setActiveOrder(order);
    setCart([]);
    setActiveTab('status');
  };

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesDietary = dietaryFilter === 'All' || item.dietary.includes(dietaryFilter);
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = item.price <= maxPrice;
    return item.isAvailable && matchesCategory && matchesDietary && matchesSearch && matchesPrice;
  });

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={styles.container}>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        orderStatus={activeOrder}
      />

      {activeTab === 'menu' && (
        <div>
          <header style={styles.header}>
            <h1>Smart Restaurant Menu</h1>
            <p>A catalog of healthy and delicous food options.</p>
          </header>

          <section style={styles.controls}>
            <div style={styles.categoryGroup}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    ...styles.tabButton,
                    backgroundColor: selectedCategory === cat ? '#2c3e50' : '#f4f4f4',
                    color: selectedCategory === cat ? '#fff' : '#333'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={styles.filterRow}>
              <input
                type="text"
                placeholder="Search dishes or ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
              <select
                value={dietaryFilter}
                onChange={(e) => setDietaryFilter(e.target.value)}
                style={styles.selectInput}
              >
                {dietaryOptions.map((opt) => (
                  <option key={opt} value={opt}>Dietary: {opt}</option>
                ))}
              </select>
              <label style={styles.priceLabel}>
                Max Price: <strong>${maxPrice}</strong>
                <input
                  type="range"
                  min="5"
                  max="25"
                  step="1"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  style={{ marginLeft: '8px' }}
                />
              </label>
            </div>
          </section>

          <main style={styles.grid}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <MenuCard key={item.id} item={item} onAddToCart={handleAddToCart} />
              ))
            ) : (
              <p style={styles.emptyMessage}>No menu items match your current filters.</p>
            )}
          </main>
        </div>
      )}

      {activeTab === 'cart' && (
        <CartDrawer
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onCheckout={handleCheckout}
          onBackToMenu={() => setActiveTab('menu')}
        />
      )}

      {activeTab === 'reservations' && <ReservationsPage />}

      {activeTab === 'status' && activeOrder && (
        <div style={styles.statusContainer}>
          <h2>Order Confirmation & Status</h2>
          <div style={styles.statusBox}>
            <p>Order ID: <strong>{activeOrder.id}</strong></p>
            <p>Customer: <strong>{activeOrder.customerName}</strong></p>
            <p>Type: <strong>{activeOrder.orderType}</strong> ({activeOrder.address})</p>
            <p>Current Status: <span>{activeOrder.status}</span></p>
            <hr />
            <h4>Items Ordered:</h4>
            <ul>
              {activeOrder.items.map((i) => (
                <li key={i.id}>{i.name} x {i.quantity} (${(i.price * i.quantity).toFixed(2)})</li>
              ))}
            </ul>
            <h4>Total Paid: ${activeOrder.total.toFixed(2)}</h4>
          </div>
          <button onClick={() => setActiveTab('menu')} style={styles.tabButton}>Return to Menu</button>
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
    fontFamily: 'system-ui, -apple-system, sans-serif',
    color: '#222'
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px'
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '28px',
    padding: '16px',
    backgroundColor: '#fafafa',
    borderRadius: '8px',
    border: '1px solid #eaeaea'
  },
  categoryGroup: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  tabButton: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem'
  },
  filterRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  searchInput: {
    flex: '1',
    minWidth: '200px',
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '0.95rem'
  },
  selectInput: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '0.95rem',
    backgroundColor: '#fff'
  },
  priceLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.9rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px'
  },
  emptyMessage: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    color: '#666',
    padding: '40px'
  },
  statusContainer: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  statusBox: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    marginBottom: '20px'
  },
};