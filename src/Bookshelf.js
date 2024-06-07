import React from 'react';

const Bookshelf = ({ books, removeFromBookshelf }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Bookshelf</h2>
      <div className="flex w-full flex-wrap gap-2  flex-col sm:flex-row">
        {books.map((book, index) => (
          <div key={index} className="border p-4 rounded shadow sm:w-1/4 h-64 flex flex-col items-center justify-around">
           <h3 className=""> <span className='text-xl font-semibold mr-2'>Book Title:</span>{book.title}</h3>
              
              <p><span className='text-xl font-semibold mr-2'>Edition Count:</span>{book.edition_count}</p>
            <button
              className="mt-2 p-2 bg-red-500 text-white rounded"
              onClick={() => removeFromBookshelf(book.key)}
            >
              Remove from Bookshelf
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookshelf;
