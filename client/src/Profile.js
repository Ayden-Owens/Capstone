import React, { useEffect, useState, useCallback } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import Header from './Header';
import Footer from './Footer';
import "./Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [savedIngredients, setSavedIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');

  // Fetch email and username
  useEffect(() => {
    const authToken = Cookies.get('userToken');
    Axios.get('https://capstonewebapp-a60f1bedd13c.herokuapp.com/users/profile', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        console.log('Profile response:', response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Fetch and display saved ingredients
  const fetchSavedIngredients = useCallback(async () => {
    try {
      const response = await Axios.get(
        'https://capstonewebapp-a60f1bedd13c.herokuapp.com/users/saved_ingredients',
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get('userToken')}`,
          },
        }
      );
      console.log('Response Data:', response.data);
      setSavedIngredients(response.data.savedIngredients);
      setIngredientName('');
      setIngredientQuantity('');
    } catch (error) {
      console.error(error);
    }
  }, []);

  const { username = '', email = '' } = userData || {};

  // insert ingredients into the fridge table
  const handleSaveIngredients = async () => {
    try {
      console.log('Input Ingredient Name:', ingredientName);

      const trimmedIngredientName = ingredientName.toLowerCase().trim();
      console.log('trimmedIngredientName:' + trimmedIngredientName);

      if (!trimmedIngredientName) {
        console.error('Ingredient name cannot be empty.');
        return;
      }

      if (!ingredientQuantity) {
        console.error('Quantity cannot be empty.');
        return;
      }

      const response = await Axios.post(
        'https://capstonewebapp-a60f1bedd13c.herokuapp.com/users/profile_ingredient_list',
        {
          name: trimmedIngredientName,
          quantity: ingredientQuantity,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get('userToken')}`,
          },
        }
      );
      console.log(response.data);
      // Only fetch ingredients after a successful save
      fetchSavedIngredients();
      setIngredientName('');
      setIngredientQuantity('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSavedIngredients();
  }, []);

  const handleDeleteIngredient = async (ingredientName) => {
    try {
      const response = await Axios.delete(
        'https://capstonewebapp-a60f1bedd13c.herokuapp.com/users/delete_ingredient',
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get('userToken')}`,
          },
          data: {
            name: ingredientName,
          },
        }
      );
      setSavedIngredients(response.data.savedIngredients);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header/>
      <div className='Account-Information'>
        <h2>Username: {username}</h2>
        <h2>Email: {email}</h2>
      </div>
      <form>
        <h3>Ingredients:</h3>
        <input
          type='text'
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
          placeholder='Ingredient Name'
        />
        <input
          type='text'
          value={ingredientQuantity}
          onChange={(e) => setIngredientQuantity(e.target.value)}
          placeholder='Quantity'
        />
        <button type='button' onClick={handleSaveIngredients}>
          Save
        </button>
      </form>
      <div>
        <h3>Saved Ingredients:</h3>
        <ul>
          {savedIngredients &&
            savedIngredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.name} - {ingredient.quantity}
                <button onClick={() => handleDeleteIngredient(ingredient.name)}>
                  Delete Ingredient
                </button>
              </li>
            ))}
        </ul>
      </div>
      <Footer/>
    </div>
  );
};

export default Profile;
