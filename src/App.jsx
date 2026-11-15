import React, { useState } from 'react';
import { MENU_ITEMS } from './data/menuData';
import MenuCard from './components/MenuCard';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dietaryFilter, setDietaryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(25);

  const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Beverages'];
  const dietaryOptions = ['All', 'Vegetarian', 'Gluten-Free'];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesDietary = dietaryFilter === 'All' || item.dietary.includes(dietaryFilter);
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = item.price <= maxPrice;

    return item.isAvailable && matchesCategory && matchesDietary && matchesSearch && matchesPrice;
  });

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Smart Restaurant Menu</h1>
        <p>A catalog of healthy and delcious food options.</p>
      </header>

      {/* Filter & Search Controls */}
      <section style={styles.controls}>
        {/* Category Tabs */}
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
              <option key={opt} value={opt}>
                Dietary: {opt}
              </option>
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

      {/* Menu Grid */}
      <main style={styles.grid}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => <MenuCard key={item.id} item={item} />)
        ) : (
          <p style={styles.emptyMessage}>No menu items match your current filters.</p>
        )}
      </main>
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
    marginBottom: '32px'
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
  }
};