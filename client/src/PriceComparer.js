// PriceComparator.js
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBarProducts';
import Header from './Header';
import Footer from './Footer';

const PriceComparer = () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSearchResults = (searchResults) => {
    setItems(searchResults);
  };

  const handleItemClick = (productId) => {
    const selectedItem = items.find(item => item.productId === productId);
    setSelectedItems([...selectedItems, selectedItem]);
  };

  const handleRemoveItem = (productId) => {
    const updatedSelectedItems = selectedItems.filter(item => item.productId !== productId);
    setSelectedItems(updatedSelectedItems);
  };

  useEffect(() => {
    const newTotalPrice = selectedItems.reduce((acc, item) => {
      const priceToAdd = item.price[0].promo !== 0 && item.price[0].promo < item.price[0].regular
        ? item.price[0].promo
        : item.price[0].regular;

      return acc + priceToAdd;
    }, 0);

    setTotalPrice(newTotalPrice);
  }, [selectedItems]);

  return (
    <div>
      <Header />
      <div>
        <h1>Price Compararer</h1>
        <SearchBar onSearchResults={handleSearchResults} />
        <ul>
          {items.map(item => (
            <li key={item.productId} onClick={() => handleItemClick(item.productId)} style={{ cursor: 'pointer' }}>
              <h2>{item.brand || 'Kroger'}</h2>
              <p>Regular Price: ${item.price[0].regular}</p>
              <p>Promo Price: ${item.price[0].promo !== 0 ? item.price[0].promo : 'N/A'}</p>
            </li>
          ))}
        </ul>
        <h2>Selected Items</h2>
        <ul>
          {selectedItems.map(item => (
            <li key={item.productId} onClick={() => handleRemoveItem(item.productId)} style={{ cursor: 'pointer' }}>
              <h2>{item.brand || 'Kroger'}</h2>
              <p>Regular Price: ${item.price[0].regular}</p>
              <p>Promo Price: ${item.price[0].promo !== 0 ? item.price[0].promo : 'N/A'}</p>
            </li>
          ))}
        </ul>
        <h2>Total Price: ${totalPrice}</h2>
      </div>
      <Footer />
    </div>
  );
};

export default PriceComparer;





