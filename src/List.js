import React  from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
function List (props) {
    const {list, handleDeleteItem, handleEditItem} = props;
  return (
    <div className='grocery-list'>

      {list.map((job) => { 
        const {id , title} = job;
        return(
          <div key={id} className='grocery-item'>
            <p className='title'>{title}</p>
            <div className='btn-container'>
              <button type ='button' className='edit-btn' onClick={() => handleEditItem(id)}> <FaEdit/> </button>
              <button type ='button' className='delete-btn' onClick={() => handleDeleteItem(id)}> <FaTrash/> </button>
            </div>
          </div>
        )
      })}
      
    </div>
  )
}

export default List
