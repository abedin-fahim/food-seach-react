import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { useParams, Link } from 'react-router-dom';
const url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const SingleFood = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    setLoading(true);

    const getMeals = async () => {
      try {
        const response = await fetch(`${url}${id}`);
        const food = await response.json();

        if (food.meals) {
          const {
            strMeal: name,
            strCategory: category,
            strArea: from,
            strInstructions: instruction,
            strMealThumb: image,
            strTags: tags,
          } = food.meals[0];

          const newMeal = {
            name,
            category,
            from,
            instruction,
            image,
            tags,
          };

          setMeal(newMeal);
        } else {
          setMeal(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getMeals();
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (!meal) {
    return <h2 className='section-title'>Meal not found</h2>;
  }

  const { name, category, from, instruction, image, tags } = meal;
  return (
    <section className='section cocktail-section'>
      <Link
        to='/'
        className='btn btn-primary'
      >
        back home
      </Link>
      <h2 className='section-title'>{meal.name} </h2>
      <div className='drink'>
        <img
          src={image}
          alt={name}
        />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name: </span>
            {name}
          </p>
          <p>
            <span className='drink-data'>category: </span>
            {category}
          </p>
          <p>
            <span className='drink-data'>From: </span>
            {from}
          </p>
          <p>
            <span className='drink-data'>tags: </span>
            {tags ? tags : 'other'}
          </p>
          <p>
            <span className='drink-data'>instructions:</span>
            {instruction}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleFood;
