import React from 'react';
import { Link } from 'react-router-dom';

const Food = ({ id, name, image, tags, from, category }) => {
  return (
    <article className='cocktail'>
      <div className='img-container'>
        <img
          src={image}
          alt={name}
        />
      </div>
      <div className='cocktail-footer'>
        <h3>{name}</h3>
        <h4>{category}</h4>
        <p>{tags ? tags : 'other'}</p>
        <p>From: {from}</p>
        <Link
          to={`/foods/${id}`}
          className='btn btn-primary'
        >
          Details
        </Link>
      </div>
    </article>
  );
};

export default Food;
