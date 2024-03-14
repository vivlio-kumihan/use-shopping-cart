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
        検索に合致する商品はございません。
      </p>
        ) 
        : (
      filterCourseFn.map((product) => (
      <div className="product" key={product.id}>
        <img src={product.image} alt={product.name} />
        <h2>{product.name}</h2>
        <p>￥{product.price}</p>
        <button
          className="add-to-cart-button"
          onClick={() => addCourseToCartFn(product)}
        >
          授与品のリストへ登録
        </button>
      </div>))
        )
      }
    </div>
  );
};

export default ShowCourse;