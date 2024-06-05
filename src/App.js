import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/items')
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter(item =>
    item.id.toString().includes(searchTerm) ||
    item.stock_count.toString().includes(searchTerm) ||
    item.purchase_order_ids.toString().includes(searchTerm) ||
    item.sales_order_ids.toString().includes(searchTerm) ||
    item.total_purchase_value.toString().includes(searchTerm) ||
    item.total_sales_value.toString().includes(searchTerm)
  );

  return (
    <div className="container-fluid p-0">
      <div className="animated-background"></div>
      <div className="content">
        <h1 className="text-center mb-5">Car Inventory</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="form-control mb-3"
        />
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Stock Count</th>
                <th>Purchase Order IDs</th>
                <th>Sales Order IDs</th>
                <th>Total Purchase Value</th>
                <th>Total Sales Value</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.stock_count}</td>
                  <td>{item.purchase_order_ids}</td>
                  <td>{item.sales_order_ids}</td>
                  <td>{item.total_purchase_value}</td>
                  <td>{item.total_sales_value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
