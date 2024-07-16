import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await axios.get('https://mernback-8rvz.onrender.com/dishes');
      setDishes(response.data);
    } catch (error) {
      console.error('Error fetching dishes:', error);
    }
  };

  const togglePublishStatus = async (e, id, currentStatus) => {
    e.preventDefault();
    try {
      await axios.patch(`https://mernback-8rvz.onrender.com/dishes/${id}`, { isPublished: !currentStatus });
      fetchDishes(); // Fetch the updated list of dishes
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Dish Dashboard</h1>
      <ul className="dishes-list">
        {dishes.map(dish => (
          <li key={dish.id}>
            <img src={dish.imageUrl} alt={dish.dishName} />
            <h2>{dish.dishName}</h2>
            <p>{dish.isPublished ? 'Published' : 'Unpublished'}</p>
            <button onClick={(e) => togglePublishStatus(e, dish.id, dish.isPublished)}>
              {dish.isPublished ? 'Unpublish' : 'Publish'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
