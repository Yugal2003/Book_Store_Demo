import React from 'react'
import axios from 'axios';

const UpdateData = ({fetchBooks}) => {

    const apiUrl = 'http://localhost:3002/books';

    const updateBookById = async () => {
        const bookId = prompt('Enter the Book Id:');
        if (!bookId){
            alert("Please Enter an Number!")
            return;
        }
        else if(isNaN(bookId)){
            alert("Please Enter an Number!")
            return
        }
        else if(bookId > 50){
            alert("Enter id is Not Found !")
            return;
        }
        try {

          const response = await axios.get(apiUrl);
          const books = response.data;
    
          const numericBookId = parseInt(bookId, 10);
    
          if (isNaN(numericBookId)) {
            alert('Please enter a valid number for Book ID!');
            return;
          }
    
          const book = books.find((b) => parseInt(b.id, 10) === numericBookId); 

          if (!book) {
            alert('Book Not Found!');
            return;
          }

          const updateData = prompt('Enter Updated book format: Title,Author,Description,Pages,Category,Price,ReleasedYear');
          if (!updateData) return;
      
          const [title, author, description, pages, category, price, releasedYear] = updateData.split(',');
      
          const updatedBook = {
            title: title.trim(),
            author: author.trim(),
            description: description.trim(),
            pages: parseInt(pages.trim(), 10),
            category: category.trim(),
            price: parseFloat(price.trim()),
            releasedYear: parseInt(releasedYear.trim(), 10)
          };
    
       
          await axios.put(`${apiUrl}/${bookId}`, updatedBook);
          fetchBooks(); 
        } catch (error) {
          console.error('Error updating book:', error);
        }
    };


    const updateByBookName = async () => {
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

          // const isString = !bookName.split('').some(char => !isNaN(char));
          // if (!isString) {
          //   alert("Please Enter Character Only !");
          //   return;
          // }

          const updateData = prompt('Enter Updated book format: Title,Author,Description,Pages,Category,Price,ReleasedYear');
          if (!updateData) return;

          const [title, author, description, pages, category, price, releasedYear] = updateData.split(',');

          const updatedBook = {
              title: title.trim(),
              author: author.trim(),
              description: description.trim(),
              pages: parseInt(pages.trim(), 10),
              category: category.trim(),
              price: parseFloat(price.trim()),
              releasedYear: parseInt(releasedYear.trim(), 10)
          };

          await axios.put(`${apiUrl}/${book.id}`, updatedBook);
          fetchBooks();

      } catch (error) {
          console.error('Error fetching or updating book:', error);
      }
    };
    const updateBookByNameAndAuthor = async () =>{
        const bookNameAndAuthor = prompt('Enter Book Name & Author (comma-separated)');
        if(!bookNameAndAuthor){
          alert("Please Enter Book Name OR Author")
          return;
        }

        const [bookName,bookAuthor] = bookNameAndAuthor.split(',');
        
        if (!bookName || !bookAuthor) {
        alert("Please Enter both Book Name and Author !");
        return;
        }

        const isBookNameString = !bookName.split('').some(char => !isNaN(char));
        const isAuthorString = !bookAuthor.split('').some(char => !isNaN(char));

        if (!isBookNameString || !isAuthorString) {
          alert("Please Enter Character Only !");
          return;
        }

        try {
          const response = await axios.get(apiUrl);
          const books = response.data;
  
          const book = books.find(b =>
            b.title.toLowerCase() === bookName.trim().toLowerCase() &&
            b.author.toLowerCase() === bookAuthor.trim().toLowerCase()
        );

        if (!book) {
            alert("Book not found!");
            return;
        }
  
          const updateData = prompt('Enter Updated book format: Title,Author,Description,Pages,Category,Price,ReleasedYear');
          if (!updateData) return;
  
          const [title, author, description, pages, category, price, releasedYear] = updateData.split(',');
  
          const updatedBook = {
              title: title.trim(),
              author: author.trim(),
              description: description.trim(),
              pages: parseInt(pages.trim(), 10),
              category: category.trim(),
              price: parseFloat(price.trim()),
              releasedYear: parseInt(releasedYear.trim(), 10)
          };
  
          await axios.put(`${apiUrl}/${book.id}`, updatedBook);
          fetchBooks();
  
        } catch (error) {
            console.error('Error fetching or updating book:', error);
        }
    } 
  return (
    <div className='flex flex-row justify-start items-center gap-10 mb-3'>
        <button className='border-none bg-green-500 text-white text-base cursor-pointer px-2 py-2 rounded-md font-bold' onClick={updateBookById}>Update Book by ID</button>
        <button className='border-none bg-green-500 text-white text-base cursor-pointer px-2 py-2 rounded-md font-bold' onClick={updateByBookName}>Update By Book Name</button>
        <button className='border-none bg-green-500 text-white text-base cursor-pointer px-2 py-2 rounded-md font-bold' onClick={updateBookByNameAndAuthor}>Update By Name And Author</button>
    </div>
  )
}

export default UpdateData;