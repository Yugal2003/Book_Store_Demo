import React from 'react'
import axios from 'axios';

const DeleteData = ({fetchBooks}) => {

    const apiUrl = 'http://localhost:3002/books';

    const deleteBookById = () =>{

    }

    const deleteBookByName = () =>{

    }
    const deleteBookByAuthorAndDescription = () =>{

    }

    const deleteBookByNameAndCategory= () =>{
        
    }
  return (
    <div>
        <button onClick={deleteBookById}>Update Book by ID</button>
        <button onClick={deleteBookByName}>Update By Name</button>
        <button onClick={deleteBookByAuthorAndDescription}>Update By Name And Author</button>
        <button onClick={deleteBookByNameAndCategory}>Update By Name And Author</button>
    </div>
  )
}

export default DeleteData;