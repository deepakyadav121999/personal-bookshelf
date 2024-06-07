import React, { useState } from 'react';
import axios from 'axios';

const BookSearch = ({ addToBookshelf, bookshelf }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value) {
      setLoading(true);
      try {
        const res = await axios.get(`https://openlibrary.org/search.json?q=${e.target.value}&limit=10&page=1`);
        setResults(res.data.docs);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
      setLoading(false);
    }
  };
console.log(results)
  const isBookInBookshelf = (book) => {
    return bookshelf.some(b => b.key === book.key);
  };


  return (
    <div className="p-4">
      <input
        type="text"
        className="border p-2 w-full mb-4"
        placeholder="Search for books..."
        value={query}
        onChange={handleSearch}
      />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="flex w-full flex-wrap gap-2 justify-center flex-col sm:flex-row">
          {results.map((book) => (
            <div key={book.key} className="border p-4 rounded shadow sm:w-1/4 h-64 flex flex-col items-center justify-around">
              <h3 className=""> <span className='text-xl font-semibold mr-2'>Book Title:</span>{book.title}</h3>
              
              <p><span className='text-xl font-semibold mr-2'>Edition Count:</span>{book.edition_count}</p>
              {!isBookInBookshelf(book) && (
                <button
                  className="mt-2 p-2 bg-green-600 text-white rounded-xl"
                  onClick={() => addToBookshelf(book)}
                >
                  Add to Bookshelf
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookSearch;
