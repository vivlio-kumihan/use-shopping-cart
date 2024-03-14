//components/ShowCourse.js^$\n
import React from 'react';

import "../sass/ShowCourse.sass";

const ShowCourse = ({
  courses, 
  addCourseToCartFn,
  filterCourseFn, 
}) => {
  return (
    <div className="product-list">
      {filterCourseFn.length === 0 
        ? (
      <p className="no-results">
        Sorry Geek, No matching Product found.
      </p>
        ) 
        : (
      filterCourseFn.map((product) => (
      <div className="product" key={product.id}>
        <img src={product.image} alt={product.name} />
        <h2>{product.name}</h2>
        <p>Price: ₹{product.price}</p>
        <button
          className="add-to-cart-button"
          onClick={() => addCourseToCartFn(product)}
        >
          Add to Shopping Cart
        </button>
      </div>))
        )
      }
    </div>
  );
};

export default ShowCourse;