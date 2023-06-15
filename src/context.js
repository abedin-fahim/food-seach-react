import React, { useState, useContext, useEffect, useCallback } from 'react';
import SearchForm from './components/SearchForm';

const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('a');
  const [food, setFood] = useState([]);

  const fetchFood = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();

      const { meals } = data;

      if (meals) {
        const newFoods = meals.map((food) => {
          const {
            idMeal,
            strMeal,
            strMealThumb,
            strTags,
            strArea,
            strCategory,
          } = food;
          return {
            id: idMeal,
            name: strMeal,
            image: strMealThumb,
            tags: strTags,
            from: strArea,
            category: strCategory,
          };
        });
        setFood(newFoods);
      } else {
        setFood([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchFood();
  }, [searchTerm, fetchFood]);

  return (
    <AppContext.Provider value={{ loading, food, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
