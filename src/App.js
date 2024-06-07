import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookSearch from './BookSearch';
import Bookshelf from './Bookshelf';

const App = () => {
  const [bookshelf, setBookshelf] = useState(() => {
    const savedBooks = localStorage.getItem('bookshelf');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
  }, [bookshelf]);

  const addToBookshelf = (book) => {
    setBookshelf((prevBooks) => [...prevBooks, book]);
  };

  const removeFromBookshelf = (bookKey) => {
    setBookshelf((prevBooks) => prevBooks.filter(book => book.key !== bookKey));
  };

  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="mb-4 flex items-center justify-between">
          <Link to="/" className="mr-4 font-semibold text-xl">Search by book name</Link>
          <Link to="/bookshelf" className='text-white bg-green-600 p-2 rounded-xl'>My Bookshelf</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={<BookSearch addToBookshelf={addToBookshelf} bookshelf={bookshelf} />}
          />
          <Route
            path="/bookshelf"
            element={<Bookshelf books={bookshelf} removeFromBookshelf={removeFromBookshelf} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
