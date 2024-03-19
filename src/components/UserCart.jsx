import "../sass/UserCart.sass";

import React from 'react';

const UserCart = ({
  cartCourses,
  setCartCourses,
  deleteCourseFromCartFn,
  totalAmountCalculationFn,
  }) => {

  const handleIncreaseQuantity = (color) => {
    const updatedCourses = cartCourses.map(item => {
      const updatedColors = item.product.color.map(c => {
        return c.name === color.name 
          ? { ...c, quantity: c.quantity + 1 } : c;
      });
      const totalQuantity = updatedColors.reduce((total, c) => total + c.quantity, 0);
      return { ...item, product: { ...item.product, color: updatedColors, quantity: totalQuantity }};
    });
    setCartCourses(updatedCourses);
    console.log(updatedCourses);
  };

  const handleDecreaseQuantity = (color) => {
    const updatedCourses = cartCourses.map(item => {
      const updatedColors = item.product.color.map(c => {
      return c.name === color.name 
        ? { ...c, quantity: Math.max(c.quantity - 1, 0) } : c;
      });
      return { ...item, product: { ...item.product, color: updatedColors }};
    });
    setCartCourses(updatedCourses);
  };  

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
                {item.product.color.map(color => (
                  <li key={color.name}>
                    <span>{color.name}</span>
                    <button onClick={() => handleIncreaseQuantity(color)}>+</button>
                    <span>{color.quantity}</span>
                    <button onClick={() => handleDecreaseQuantity(color)}>-</button>
                  </li>
                ))}
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




              // <ul>
              //   {
              //     item.product.color.map(col => (
              //   <li key={col}>
              //     {col}
              //     <div className="count-color">
              //     <button
              //       onClick={() => {
              //       setCartCourses((prevCartCourses) => {
              //         const updatedCart = prevCartCourses.map((prevItem) =>
              //           prevItem.product.id === item.product.id
              //             ? { ...prevItem, quantity: item.quantity + 1 }
              //             : prevItem
              //         );
              //         return updatedCart;
              //       })
              //     }}>+</button>
              //     <p className='quant'>{item.quantity}</p>
              //     <button 
              //       onClick={(e) => {
              //       setCartCourses((prevCartCourses) => {
              //         const updatedCart = prevCartCourses.map((prevItem) =>
              //           prevItem.product.id === item.product.id
              //             ? { ...prevItem, quantity: Math.max(item.quantity - 1, 0) }
              //             : prevItem
              //         );
              //         return updatedCart;
              //       })
              //     }}>-</button>
              //   </div>
              //   </li>
              //     ))
              //   }
              // </ul>