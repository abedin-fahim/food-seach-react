import React from 'react';
import Food from './Food';
import Loading from './Loading';
import { useGlobalContext } from '../context';

const FoodList = () => {
  const { food, loading } = useGlobalContext();
  console.log(food);
  if (loading) {
    return <Loading />;
  }
  if (food.length < 1) {
    return <h2 className='section-title'>No food matched your search!</h2>;
  }
  return (
    <section className='section'>
      <h2 className='section-title'>Food list</h2>
      <div className='cocktails-center'>
        {food.map((item) => {
          return (
            <Food
              key={item.id}
              {...item}
            />
          );
        })}
      </div>
    </section>
  );
};

export default FoodList;
