import React, { useEffect, useState } from 'react';
// import { MdLocalGroceryStore } from "react-icons/md";
import { FaBook } from "react-icons/fa6";
import axios from 'axios';
import UpdateData from './UpdateData';
import DeleteData from './DeleteData';
import SortData from './SortData';
import ShowData from './ShowData';

const BookStore = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State to capture the search input
  const apiUrl = 'http://localhost:3002/books';

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async (sortedBooks = null) => {
    try {
      if (sortedBooks) {
        setBooks(sortedBooks);
      } else {
        const response = await axios.get(apiUrl);
        setBooks(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Pagination logic start
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 10;
  const lastIndex = itemPerPage * currentPage;
  const firstIndex = lastIndex - itemPerPage;
  
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.pages.toString().includes(searchTerm) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.price.toString().includes(searchTerm) ||
    book.releasedYear.toString().includes(searchTerm)
  );

  const pagePerItem = filteredBooks.slice(firstIndex, lastIndex);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPage = Math.ceil(filteredBooks.length / itemPerPage);

  const pageButtons = [];
  for (let i = 1; i <= totalPage; i++) {
    pageButtons.push(
      <button
        className={`px-4 py-2 mx-2 my-2 text-xl border-2 border-black rounded-3xl ${currentPage === i ? 'active-page' : ''}`}
        key={i}
        onClick={() => paginate(i)}
      >
        {i}
      </button>
    );
  }

  return (
    <div>
      <div className="w-[88%] mt-0 mx-auto flex flex-row items-center justify-between">
        <h1 className="sm:my-4 text-4xl font-semibold">Book Store</h1>
        
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
          <label>Search Books : </label>
          <input
            className='border-2 border-black rounded-md px-2 py-1'
            type='text'
            placeholder='Search by Title, Pages, Price, Year...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Capture search input
          />
        </div>
      </div>
      <br />

      {/* button list start */}
      <div className='border-4 border-y-black px-8 py-6'>
        <UpdateData fetchBooks={fetchBooks} />
        <DeleteData fetchBooks={fetchBooks} />
        <SortData fetchBooks={fetchBooks} />
        <ShowData fetchBooks={fetchBooks} />
      </div>
      {/* button list end */}
      <br />

      {/* data start */}
      <div className="overflow-x-auto">
        <table className="w-full sm:w-[95%] md:w-[88%] mx-auto border-4 border-black">
          <thead className="border-4 border-black">
            <tr>
              <th className="text-sm sm:text-lg lg:text-xl xl:text-2xl py-3 border-4 border-black w-[20%] sm:w-[15%] md:w-[5%]">Book Id</th>
              <th className="text-sm sm:text-lg lg:text-xl xl:text-2xl border-4 border-black w-[40%] sm:w-[32%] md:w-[14%]">Book Name</th>
              <th className="text-sm sm:text-lg lg:text-xl xl:text-2xl border-4 border-black w-[20%] sm:w-[12%] md:w-[26%]">Book Desc</th>
              <th className="text-sm sm:text-lg lg:text-xl xl:text-2xl border-4 border-black w-[10%] sm:w-[8%] md:w-[11%]">Book Author</th>
              <th className="text-sm sm:text-lg lg:text-xl xl:text-2xl border-4 border-black w-[20%] sm:w-[20%] md:w-[8%]">No of Pages</th>
              <th className="text-sm sm:text-lg lg:text-xl xl:text-2xl border-4 border-black w-[20%] sm:w-[15%] md:w-[18%]">Book Category</th>
              <th className="text-sm sm:text-lg lg:text-xl xl:text-2xl border-4 border-black w-[40%] sm:w-[32%] md:w-[8%]">Book Price</th>
              <th className="text-sm sm:text-lg lg:text-xl xl:text-2xl border-4 border-black w-[20%] sm:w-[12%] md:w-[10%]">Released Year</th>
            </tr>
          </thead>
          <tbody className="border-4 border-black">
            {filteredBooks.length >= 1 ? (
              pagePerItem.map((book, index) => (
                <tr key={book.id}>
                  <td className="border-4 border-black">
                    <p className="w-20 h-20 sm:w-24 sm:h-24 md:w-14 md:h-6 lg:w-32 lg:h-16 mx-auto text-xl flex flex-row justify-center items-center text-center">{book.id}</p>
                  </td>
                  <td className="border-4 border-black">
                    <p className="text-center text-sm sm:text-lg lg:text-xl font-semibold md:w-38 md:h-12">{book.title}</p>
                  </td>
                  <td className="border-4 border-black">
                    <p className="text-center text-sm sm:text-lg lg:text-xl font-semibold">{book.description}</p>
                  </td>
                  <td className="border-4 border-black">
                    <p className="text-center text-sm sm:text-lg lg:text-xl font-semibold">{book.author}</p>
                  </td>
                  <td className="border-4 border-black">
                    <p className="text-center text-sm sm:text-lg lg:text-xl font-semibold">{book.pages}</p>
                  </td>
                  <td className="border-4 border-black">
                    <p className="text-center text-sm sm:text-lg lg:text-xl font-semibold">{book.category}</p>
                  </td>
                  <td className="border-4 border-black">
                    <p className="text-center text-sm sm:text-lg lg:text-xl font-semibold">{book.price}</p>
                  </td>
                  <td className="border-4 border-black">
                    <p className="text-center text-sm sm:text-lg lg:text-xl font-semibold">{book.releasedYear}</p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="border-4 border-black">
                  <div className="flex flex-col justify-center items-center h-52">
                    <FaBook className="text-gray-300" size={75} /><br/>
                    <p className="text-gray-400 text-2xl">Book Store is Empty!</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "center" }} className="py-0">
          <button
            id='btn-prev'
            className={`border-2 border-black py-0 px-4 mt-1 rounded-full text-xl cursor-pointer ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            Prev
          </button>
          {pageButtons}
          <button
            id='btn-next'
            className={`border-2 border-black py-0 px-4 mt-1 rounded-full text-xl cursor-pointer ${currentPage === totalPage ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentPage === totalPage}
            onClick={() => paginate(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
      {/* data end */}
    </div>
  );
};

export default BookStore;
