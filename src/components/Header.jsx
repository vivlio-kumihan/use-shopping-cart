//components/Search.js
import React from 'react';

const Header = ({ searchCourse, courseSearchUserFn }) => {
  return (
    <header className="App-header">
      <h1>授与品のご紹介</h1>
      <div className="search-bar">
        {/* 課題　インプットに入力しても文字が表示されない問題。 */}
        <input
          type="text"
          placeholder="授与品の検索"
          value={searchCourse}
          onChange={courseSearchUserFn}
        />
      </div>
    </header>
  );
};

export default Header;