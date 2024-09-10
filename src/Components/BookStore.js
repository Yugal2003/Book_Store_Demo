import React, { useEffect, useState } from 'react';
import { MdLocalGroceryStore } from "react-icons/md";
import axios from 'axios';
import UpdateData from './UpdateData';
import DeleteData from './DeleteData';
import SortData from './SortData';
import ShowData from './ShowData';

const BookStore = () => {
  const [books, setBooks] = useState([]);
  const apiUrl = 'http://localhost:3002/books';

  useEffect(() => {
    fetchBooks();
  }, []);

  // const fetchBooks = async () => {
  //   try {
  //     const response = await axios.get(apiUrl);
  //     console.log(response.data);
      
  //     setBooks(response.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };


  // new chnage code for fetchbooks
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
  
  return (
    <div>
      <div className="w-[80%] my-2 mx-auto flex flex-row items-center justify-between">
        <h1 className="my-0 sm:my-4 text-2xl sm:text-3xl font-semibold">Book Store</h1>
      </div>
      <br />

      {/* button list start */}
      <UpdateData fetchBooks={fetchBooks}/><br/><br/>
      <DeleteData fetchBooks={fetchBooks}/><br/><br/>
      <SortData   fetchBooks={fetchBooks}/><br/><br/>
      <ShowData   fetchBooks={fetchBooks}/>
      {/* button list end */}
      <br/>
      {/* data start */}
      <div className="overflow-x-auto">
        <table className="w-full sm:w-[95%] md:w-[88%] mx-auto border-4 border-black">
          <thead className="border-4 border-black">
            <tr>
              <th className="text-sm sm:text-lg md:text-xl border-4 border-black w-[20%] sm:w-[15%] md:w-[15%]">Book Id</th>
              <th className="text-sm sm:text-lg md:text-xl border-4 border-black w-[40%] sm:w-[32%] md:w-[32%]">Book Name</th>
              <th className="text-sm sm:text-lg md:text-xl border-4 border-black w-[20%] sm:w-[12%] md:w-[12%]">Book Desc</th>
              <th className="text-sm sm:text-lg md:text-xl border-4 border-black w-[10%] sm:w-[8%] md:w-[8%]">Book Author</th>
              <th className="text-sm sm:text-lg md:text-xl border-4 border-black w-[20%] sm:w-[20%] md:w-[20%]">No of Page</th>
              <th className="text-sm sm:text-lg md:text-xl border-4 border-black w-[20%] sm:w-[15%] md:w-[15%]">Book Catogory</th>
              <th className="text-sm sm:text-lg md:text-xl border-4 border-black w-[40%] sm:w-[32%] md:w-[32%]">Book Price</th>
              <th className="text-sm sm:text-lg md:text-xl border-4 border-black w-[20%] sm:w-[12%] md:w-[12%]">Released Year</th>
            </tr>
          </thead>
          <tbody className="border-4 border-black">
            {books.length >= 1 
               ? books.map((book,index) => (
              <tr key={book.id}>
                <td className="border-4 border-black">
                  <p className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto">{book.id}</p>
                </td>
                <td className="border-4 border-black">
                  <p className="text-center text-sm sm:text-lg font-semibold">{book.title}</p>
                </td>
                <td className="border-4 border-black">
                  <p className="text-center text-sm sm:text-lg font-semibold">{book.description}</p>
                </td>
                <td className="border-4 border-black">
                  <p className="text-center text-sm sm:text-lg font-semibold">{book.author}</p>
                </td>
                <td className="border-4 border-black">
                  <p className="text-center text-sm sm:text-lg font-semibold">{book.pages}</p>
                </td>
                <td className="border-4 border-black">
                  <p className="text-center text-sm sm:text-lg font-semibold">{book.category}</p>
                </td>
                <td className="border-4 border-black">
                  <p className="text-center text-sm sm:text-lg font-semibold">{book.price}</p>
                </td>
                <td className="border-4 border-black">
                  <p className="text-center text-sm sm:text-lg font-semibold">{book.releasedYear}</p>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="border-4 border-black">
                  <div className="flex flex-col justify-center items-center h-52">
                    <MdLocalGroceryStore className="text-gray-300" size={50} />
                    <p className="text-gray-400 text-xl">Your Cart is Empty!</p>
                  </div>
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
      {/* data end */}
    </div>
  );
};

export default BookStore;
