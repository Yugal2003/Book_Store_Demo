import React from 'react';
import axios from 'axios';

const SortData = ({ fetchBooks }) => {
  const apiUrl = 'http://localhost:3002/books';

  const sortBooks = async (sortFn) => {
    try {
      const response = await axios.get(apiUrl);
      const books = response.data;

      const sorted = [...books].sort(sortFn);

      fetchBooks(sorted);
    } catch (error) {
      console.error('Error fetching or sorting books:', error);
    }
  };

  const sortByBookName = () => {
    sortBooks((a, b) => {
      const titleA = (a.title || '').trim().toLowerCase();
      const titleB = (b.title || '').trim().toLowerCase();
      return titleA.localeCompare(titleB);
    });
  };

  const sortByBookPrice = () => {
    sortBooks((a, b) => a.price - b.price);
  };

  const sortByBookAuthor = () => {
    sortBooks((a, b) => {
      const authorA = (a.author || '').trim().toLowerCase();
      const authorB = (b.author || '').trim().toLowerCase();
      return authorA.localeCompare(authorB);
    });
  };

  const sortBookNoOfPages = () => {
    sortBooks((a, b) => a.pages - b.pages);
  };

  const sortByBookCategory = () => {
    sortBooks((a, b) => {
      const categoryA = (a.category || '').trim().toLowerCase();
      const categoryB = (b.category || '').trim().toLowerCase();
      return categoryA.localeCompare(categoryB);
    });
  };

  const sortByBookReleYear = () => {
    sortBooks((a, b) => a.releasedYear - b.releasedYear);
  };

  return (
    <div>
      <button onClick={sortByBookName}>Sort Book By Name</button>
      <button onClick={sortByBookPrice}>Sort Book by Price</button>
      <button onClick={sortByBookAuthor}>Sort Book by Author</button>
      <button onClick={sortBookNoOfPages}>Sort Book by Number of Pages</button>
      <button onClick={sortByBookCategory}>Sort Book by Category</button>
      <button onClick={sortByBookReleYear}>Sort Book by Released Year</button>
    </div>
  );
};

export default SortData;
