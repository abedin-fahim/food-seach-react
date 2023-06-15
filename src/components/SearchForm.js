import React, { useEffect, useRef } from 'react';
import { useGlobalContext } from '../context';

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const searchValueRef = useRef('');

  const searchChangeHandler = () => {
    setSearchTerm(searchValueRef.current.value);
  };

  useEffect(() => {
    searchValueRef.current.focus();
  }, []);

  return (
    <section className='section search'>
      <form
        className='search-form'
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className='form-control'>
          <label htmlFor='name'>Search for your favorite meal</label>
          <input
            type='text'
            id='name'
            ref={searchValueRef}
            onChange={searchChangeHandler}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
