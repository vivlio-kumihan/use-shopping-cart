//App.js
import React, { useState } from 'react';
import './App.sass';
import Header from './components/Header';
import ShowCourse from './components/ShowCourse';
import UserCart from './components/UserCart';

const App = () => {
  // 商品のDB部分
  // 留意
    // あえて状態を作っている理由がわかるようになる。
    // これを別のJSXにして管理する方法を探す。
  const [courses, setCourses] = useState([
    { id: 1, 
      name: 'GFG T-shirt', 
      color: ["white", "red", "black"],
      price: 499, 
      image: 'https://media.geeksforgeeks.org/wp-content/uploads/20230823165506/gfg1.png'
    },
    { id: 2, 
      name: 'GFG Bag', 
      color: ["white", "red", "black"],
      price: 699, 
      image: 'https://media.geeksforgeeks.org/wp-content/uploads/20230823165553/gfg2.jpg'
    },
    { id: 3, 
      name: 'GFG Hoodie', 
      color: ["white", "red", "black"],
      price: 799, 
      image: 'https://media.geeksforgeeks.org/wp-content/uploads/20230823165623/gfg3.jpg'
    }
  ]);

  // アプリのトップでカートの状態を生成。
  const [cartCourses, setCartCourses] = useState([]);

  // 商品検索の状態を生成。
  const [searchCourse, setSearchCourse] = useState('');
  // 入力された値で状態を更新する。
  const courseSearchUserFn = (e) => {
    setSearchCourse(e.target.value);
  };
  // 商品のフィルター
  // 検索機能付を書くときのアイデア。
  // 検索した商品名が含まれていたらその商品だけを配列に格納し、
  // 含まれていなかったら初期設定されている全ての配列を返す。
  const filterCourseFn = courses.filter((course) =>
    course.name.toLowerCase().includes(searchCourse.toLowerCase())
  );

  // Showで選択した商品がCartに入れて商品の状態を管理する関数。
  // Cartへ送った商品へ、数量の属性を追加しカウントを1とする。
  const addCourseToCartFn = (chiceCourse) => {
    // cartCoursesの初期値は空の配列。
    // カートに選択した商品の有無をfindフィルターを通して真偽値で返す。
    const alreadyCourse = cartCourses.find(item => item.product.id === chiceCourse.id);
    // すでに商品がカートにあったら…
    if (alreadyCourse) {
      // cartCoursesに入っている商品をmapで処理し、配列の内容を変更していく。
      const latestCartUpdate = cartCourses.map(item => (
        // カートと選択した商品を比較して…
        item.product.id === chiceCourse.id 
          // 同じものがあれば数量を1つ増やす。
          ? { ...item, quantity: item.quantity + 1 } 
          // 同じもので無ければそのまま。
          : item
        ));
      // 変更した配列の内容を状態へ上書きする。
      // これが重要。このステップを入れて初めて更新できる。
      setCartCourses(latestCartUpdate);
    // カート内に選択した商品が無ければ…
    } else {
      // cartCoursesに内容を書き込む。
      // 選択した商品内容を属性「product」の値にし、 属性「quantity」に1を設定する。
      // 勘違いしてはいけない。大元のcourses内の商品の状態を上書きするわけではない。
      setCartCourses([...cartCourses, {product: chiceCourse, quantity: 1}]);
    }
  };

  // カートから商品を削除する関数
  // カート内にある商品へfilterメソッドを使い
  // 削除ボタンを押した商品『以外』のものを
  // 『収集して』状態を上書きする。
  const deleteCourseFromCartFn = (itemProductInCartCourse) => {
    const updatedCart = cartCourses.filter(item => (
      item.product.id !== itemProductInCartCourse.id
      ));
    setCartCourses(updatedCart);
  };

  // カートの合計の出し方。
  // カートの商品を一つひとつにあたって合計していく。
  const totalAmountCalculationFn = () => {
    return cartCourses.reduce((total, item) => 
               total + item.product.price * item.quantity, 0);
  };

  return (
    <div className="App">
      <Header 
        searchCourse={searchCourse} 
        courseSearchUserFn={courseSearchUserFn} />
      <main className="App-main">
        <ShowCourse
          courses={courses}
          filterCourseFn={filterCourseFn}
          addCourseToCartFn={addCourseToCartFn}
        />
  
        <UserCart
          cartCourses={cartCourses}
          deleteCourseFromCartFn={deleteCourseFromCartFn}
          totalAmountCalculationFn={totalAmountCalculationFn}
          setCartCourses={setCartCourses}
        />
      </main>
    </div>
  );
};

export default App;