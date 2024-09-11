import React from 'react';
import axios from 'axios';

const ShowData = ({ fetchBooks }) => {
  const apiUrl = 'http://localhost:3002/books';

  const showAllBooks = async () => {
    try {
        const response = await axios.get(apiUrl);
        console.log(response.data);
        fetchBooks(response.data)
      } 
      catch (error) {
        console.error("Error fetching all books", error);
      }
  };


  const showBooksById = async () => {
    const bookId = prompt("Enter Book ID:");
  
    if (!bookId) {
      alert("Please Enter a Book ID!");
      return;
    } else if (isNaN(bookId)) {
      alert("Please Enter a Number!");
      return;
    } else if (parseInt(bookId, 10) > 50) {
      alert("Entered ID Not Found!");
      return;
    }
  
    try {
      const numericBookId = parseInt(bookId, 10);
  
      const response = await axios.get(`${apiUrl}/${numericBookId}`);
      console.log(response);
      const book = response.data;
  
      if (!book) {
        alert("Book Not Found!");
        return;
      }

      fetchBooks([book]);
  
    } catch (error) {
      console.error("Error fetching book by ID:", error);
    }
  };
  
  
  const showBooksByBookName = async() => {
    const bookName = prompt('Enter the Book Name:');
        if (!bookName){
            alert("Please Enter Book Name!")
            return;
        }
    
    try {

        const response = await axios.get(apiUrl);
        const books = response.data;

        const book = books.find(b => b.title.toLowerCase() === bookName.toLowerCase());

        if (!book) {
            alert("Book not found!");
            return;
        }

        fetchBooks([book]);

    } catch (error) {
        console.error('Error fetching or updating book:', error);
    }
  };

  const showBooksByNameAndAuthor = async() => {
    const bookNameAndAuthor = prompt("Enter Book Name and Author Name (comma-separated");
    if(!bookNameAndAuthor){
        alert("Please Enter Book Name OR Author");
        return;
    }

    const [bookName,bookAuthor] = bookNameAndAuthor.split(',');
    if(!bookName || !bookAuthor){
        alert("Please Enter both Book Name and Author !");
        return;
    }

    try {
        const response = await axios.get(apiUrl);
        const books = response.data;

        const book = books.find((b) =>
        b.title.toLowerCase() === bookName.trim().toLowerCase() &&
        b.author.toLowerCase() === bookAuthor.trim().toLowerCase() 
        );

        if(!book){
            alert("Book Not Found !")
            return;
        }

        fetchBooks([book]);
    } 
    catch (error) {
        console.log("Error");
            
    }
  };

  const showBooksPagesMoreThanHundred = async() => {
    try {
        const response = await axios.get(`${apiUrl}?pages_gte=100`);
        console.log(response.data);
        fetchBooks(response.data)
      } catch (error) {
        console.error("Error fetching books with pages more than 100", error);
      }
  };

  const showBooksPagesLessNinAndMoreThanTwe = async() => {
    try {
        const response = await axios.get(`${apiUrl}?pages_lt=90&pages_gt=25`);
        console.log(response.data);
        fetchBooks(response.data)
    } 
    catch (error) {
        console.error("Error fetching books with pages more than 100", error);
    }
  };

  const showBooksPagesLessNinAndMoreThanTweNotEigh = async() => {
    try {
        const response = await axios.get(`${apiUrl}?pages_lt=90&pages_gt=25&pages_ne=80`);
        console.log(response.data);
        fetchBooks(response.data)
    } 
    catch (error) {
        console.error("Error fetching books with pages more than 100", error);
    }
  };

  const showBooksPagesZero = async() => {
    try {
        const response = await axios.get(`${apiUrl}?pages=0`)
        console.log(response.data);
        fetchBooks(response.data)
    } 
    catch (error) {
        console.error("Error fetching books with pages more than 100", error);
    }
  };

  
const showBooksReleasedFiftnAndOne = async () => {
    try {
        const response = await axios.get(apiUrl);
        const books = response.data;

        const filteredBooks = books.filter(book =>
            book.releasedYear === 2015 || book.releasedYear === 2001
        );

        console.log(filteredBooks);
        fetchBooks(filteredBooks);
    } catch (error) {
        console.error("Error fetching and filtering books", error);
    }
};

return (
  <div className='flex flex-col justify-start items-center gap-3'>
      <div className='flex flex-row justify-start items-center gap-10 w-[100%]'>
        <button className='px-auto border-none bg-green-500 text-white text-base cursor-pointer px-2 py-2 rounded-md font-bold' onClick={showAllBooks}>Show All</button>
        <button className='border-none bg-green-500 text-white text-base cursor-pointer px-2 py-2 rounded-md font-bold' onClick={showBooksById}>Show Book by Id</button>
        <button className='border-none bg-green-500 text-white text-base cursor-pointer px-2 py-2 rounded-md font-bold' onClick={showBooksByBookName}>Show Book by Name</button>
        <button className='border-none bg-green-500 text-white text-base cursor-pointer px-2 py-2 rounded-md font-bold' onClick={showBooksByNameAndAuthor}>Show Book by Name & Author</button>
      </div>
      <div className='flex flex-row justify-start items-center gap-10 w-[100%]'>
        <button className='border-none bg-green-500 text-white text-base cursor-pointer px-2 py-2 rounded-md font-bold' onClick={showBooksPagesMoreThanHundred}>Show Book pages More than 100</button>
        <button className='border-none bg-green-500 text-white text-base cursor-pointer px-2 py-2 rounded-md font-bold' onClick={showBooksPagesLessNinAndMoreThanTwe}>Show Book pages Less than 90 More than 25</button>
        <button className='border-none bg-green-500 text-white text-base cursor-pointer px-2 py-2 rounded-md font-bold' onClick={showBooksPagesLessNinAndMoreThanTweNotEigh}>Show Book pages Less than 90 More than 25 But not 80</button>
        <button className='border-none bg-green-500 text-white text-base cursor-pointer px-2 py-2 rounded-md font-bold' onClick={showBooksPagesZero}>Show Book pages Zero</button>
        <button className='border-none bg-green-500 text-white text-base cursor-pointer px-2 py-2 rounded-md font-bold' onClick={showBooksReleasedFiftnAndOne}>Show Book Released Year 2015 And 2001</button>
      </div>
    </div>
  );
};

export default ShowData;
