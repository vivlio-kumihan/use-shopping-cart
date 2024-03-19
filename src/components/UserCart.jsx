import "../sass/UserCart.sass";

import React from 'react';

const UserCart = ({
  cartCourses,
  setCartCourses,
  deleteCourseFromCartFn,
  totalAmountCalculationFn,
  }) => {

  return (
  <div className={`cart ${cartCourses.length > 0 ? 'active' : ''}`}>
    <h2>授与品リスト</h2>
    {cartCourses.length === 0 
      ? (
    <p className="empty-cart">Geek, your cart is empty.</p>
      )
      : (
    <div>
      <ul>
      {cartCourses.map((item) => (
        <li key={item.product.id} className="cart-item">
          <div>
            <div className="item-info">
              <div className="item-image">
                <img  src={item.product.image} 
                      alt={item.product.name} />
              </div>
              <div className="item-details">
                <h3>{item.product.name}</h3>
                <p>￥{item.product.price}</p>
              </div>
            </div>
            <div className="colors">
              <ul>
                {
                  item.product.color.map(col => (
                <li key={col}>
                  {col}
                  <div className="count-color">
                  <button
                    onClick={() => {
                    setCartCourses((prevCartCourses) => {
                      const updatedCart = prevCartCourses.map((prevItem) =>
                        prevItem.product.id === item.product.id
                          ? { ...prevItem, quantity: item.quantity + 1 }
                          : prevItem
                      );
                      return updatedCart;
                    })
                  }}>+</button>
                  <p className='quant'>{item.quantity}</p>
                  <button 
                    onClick={(e) => {
                    setCartCourses((prevCartCourses) => {
                      const updatedCart = prevCartCourses.map(
                      (prevItem) =>
                      prevItem.product.id === item.product.id
                          ? { ...prevItem, quantity: Math.max(item.quantity - 1, 0) }
                          : prevItem
                      );
                      return updatedCart;
                    })
                  }}>-</button>
                </div>
                </li>
                  ))
                }
              </ul>
            </div>
            <div>
              <div className="item-actions">
                <button
                  className="remove-button"
                  // クリック・イベントをきっかけに関数を発火させたいときの処理は
                  // 無名関数を使う。
                  onClick={() => deleteCourseFromCartFn(item.product)}
                >
                  授与品リストから削除する
                </button>
                <div className="quantity">
                  <button style={{ margin: "1%" }} 
                    onClick={() => {
                    // prevでもなんでもいい。
                    // setCartCoursesの状態を変更する際に用いることができる仮引数。
                    // 変更前の状態をもつ仮引数だと思っておけばいいみたい。
                    setCartCourses((prevCartCourses) => {
                      const updatedCart = prevCartCourses.map(
                      (prevItem) =>
                        prevItem.product.id === item.product.id
                          ? { ...prevItem, quantity: item.quantity + 1 }
                          : prevItem
                      );
                      return updatedCart;
                    })
                  }}>+</button>
                  <p className='quant'>{item.quantity}</p>
                  <button 
                    onClick={(e) => {
                    setCartCourses((prevCartCourses) => {
                      const updatedCart = prevCartCourses.map(
                      (prevItem) =>
                      prevItem.product.id === item.product.id
                          ? { ...prevItem, quantity: Math.max(item.quantity - 1, 0) }
                          : prevItem
                      );
                      return updatedCart;
                    })
                  }}>-</button>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
      </ul>
      <div className="checkout-section">
        <div className="checkout-total">
          <p className="total">合計: 
            ￥{totalAmountCalculationFn()}
          </p>
        </div>
        <button
          className="checkout-button"
          disabled={cartCourses.length === 0 || 
          totalAmountCalculationFn() === 0}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
      )}
  </div>
  );
};

export default UserCart;