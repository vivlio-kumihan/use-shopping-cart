//components/Search.js
import React from 'react';

const Search = ({ searchCourse, courseSearchUserFn }) => {
  return (
    <header className="App-header">
      <h1>GeeksforGeeks Shopping Cart</h1>
      <div className="search-bar">
        {/* 課題　インプットに入力しても文字が表示されない問題。 */}
        <input
          type="text"
          placeholder="Search for GFG Products..."
          value={searchCourse}
          onChange={courseSearchUserFn}
        />
      </div>
    </header>
  );
};

export default Search;