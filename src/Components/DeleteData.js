import React from 'react'
import axios from 'axios';

const DeleteData = ({fetchBooks}) => {

    const apiUrl = 'http://localhost:3002/books';

    const deleteBookById = async () => {
      const bookId = prompt('Enter Book Id:');
      if (!bookId) {
        alert('Please Enter Book Id!');
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
  
        await axios.delete(`${apiUrl}/${book.id}`);
        alert('Book Deleted Successfully!');
        fetchBooks(); 
      } catch (error) {
        console.log('Error fetching or deleting book:', error);
      }
    };
    
    const deleteByBookName = async() =>{
      const bookName = prompt('Enter Book Name:');
      if (!bookName) {
        alert('Please Enter Book Name!');
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

            await axios.delete(`${apiUrl}/${book.id}`);
            alert('Book Deleted Successfully!');
            fetchBooks();
        } catch (error) {
            console.error('Error fetching or updating book:', error);
        }
    }

    const deleteBookByAuthorAndDescription = async() =>{
      const bookAuthorAndDescription = prompt('Enter Book Author Name & Description (comma-separated)');
        if(!bookAuthorAndDescription){
          alert("Please Enter Book Author Name OR Description")
          return;
        }

        const [bookAuthorName,bookDescription] = bookAuthorAndDescription.split(',');
        
        if (!bookAuthorName || !bookDescription) {
        alert("Please Enter both Book Author Name and Description !");
        return;
        }
        

        try {
          const response = await axios.get(apiUrl);
          const books = response.data;
  
          const book = books.find(b =>
            b.author.toLowerCase() === bookAuthorName.trim().toLowerCase() &&
            b.description.toLowerCase() === bookDescription.trim().toLowerCase()
        );

        if (!book) {
            alert("Book not found!");
            return;
        }
        
        
        
        await axios.delete(`${apiUrl}/${book.id}`);
        alert('Book Deleted Successfully!');
        fetchBooks();
        } 
        catch (error) {
            console.error('Error fetching or updating book:', error);
        }
    }

    const deleteByBookNameAndCategory = async () => {
      const bookNameAndCategory = prompt('Enter Book Name & Category (comma-separated)');
      if (!bookNameAndCategory) {
        alert("Please Enter Book Name OR Category!");
        return;
      }
    
      const [bookName, bookCategory] = bookNameAndCategory.split(',');
    
      if (!bookName || !bookCategory) {
        alert("Please Enter both Book Name and Category!");
        return;
      }
    
      try {
        const response = await axios.get(apiUrl);
        const books = response.data;
    
        const book = books.find(b =>
          b.title.toLowerCase() === bookName.trim().toLowerCase() &&
          b.category.toLowerCase() === bookCategory.trim().toLowerCase()
        );
    
        if (!book) {
          alert("Book not found!");
          return;
        }
  
        await axios.delete(`${apiUrl}/${book.id}`);
        alert('Book Deleted Successfully!');
        fetchBooks();
      } catch (error) {
        console.error('Error fetching or deleting book:', error);
      }
    };
    
  return (
    <div>
        <button onClick={deleteBookById}>Delete Book By Book ID</button>
        <button onClick={deleteByBookName}>Delete Book By Book Name</button>
        <button onClick={deleteBookByAuthorAndDescription}>Delete Book By Book Author and Book Description</button>
        <button onClick={deleteByBookNameAndCategory}>Delete Book by Book Name and Book Category.</button>
    </div>
  )
}

export default DeleteData;