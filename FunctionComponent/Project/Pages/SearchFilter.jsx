import React, { useState } from 'react';
 
const SearchFilterExample = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Orange' },
    { id: 4, name: 'Pineapple' },
    { id: 5, name: 'Grapes' }
  ]);
 
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
 
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
 
    // Perform filtering logic
    if (term.trim() !== '') {
      const filtered = items.filter(item =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  };
 
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
 
      <ul>
        {/* Render items based on filteredItems if search term is present */}
        {searchTerm ? (
          filteredItems.map(item => (
            <li key={item.id}>{item.name}</li>
          ))
        ) : (
          // Render all items if no search term
          items.map(item => (
            <li key={item.id}>{item.name}</li>
          ))
        )}
      </ul>
    </div>
  );
};
 
export default SearchFilterExample;