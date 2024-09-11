import React, { useState } from 'react';
import axios from 'axios';

const AddBook = ({ fetchBooks, setShowAddBook }) => {
  const [formData, setFormData] = useState({
    id: '', 
    title: '',
    description: '',
    author: '',
    pages: '',
    category: '',
    price: '',
    releasedYear: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3002/books', formData); 
      fetchBooks(); // Refresh the book list
      setShowAddBook(false); // Hide the form
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="w-[88%] mx-auto p-4 border-4 border-black rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>
      <form onSubmit={handleSubmit}>
        {/* Input field for Book ID */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-1">ID:</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="border-2 border-black rounded-md px-2 py-1 w-full"
            required
          />
        </div>
        {/* Input fields for other book details */}
        {['title', 'description', 'author', 'pages', 'category', 'price', 'releasedYear'].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-lg font-medium mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}:</label>
            <input
              type={field === 'pages' || field === 'price' || field === 'releasedYear' ? 'number' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="border-2 border-black rounded-md px-2 py-1 w-full"
              required
            />
          </div>
        ))}
        <button type="submit" className="border-2 border-black px-4 py-2 rounded-md bg-blue-500 text-white">Add Book</button>
        <button type="button" className="border-2 border-black px-4 py-2 rounded-md bg-red-500 text-white ml-4" onClick={() => setShowAddBook(false)}>Cancel</button>
      </form>
    </div>
  );
};

export default AddBook;
