import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  // const [lists, setLists] = useState (() => {
    //   const getListLocal = JSON.parse(localStorage.getItem('lists'));
    //   return getListLocal;
    // })
  const [name, setName] = useState('');
  const getListLocal = JSON.parse(localStorage.getItem('lists'));
  const [lists, setLists] = useState (getListLocal || []);
  const [alert, setAlert] = useState ({show: false , msg : '', type : ''});
  const [isUpdate, setIsUpdate] = useState(false);
  const [idEdit, setIdEdit] =  useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name){
      showAlert(true, 'warn', ' Nhập job cần thêm !')
      return
    }else if(name && isUpdate ){
      setLists(
        lists.map(item =>{
          if(item.id === idEdit ){
            return {...item, title : name}
          }
          return item;
        })
      );
      showAlert(true, 'success', 'edit job thành công !')
      setIdEdit(null)
      setIsUpdate(false)
      setName('')
    }else{
      const newItem = { id: Math.random(lists.length + 1), title: name };
      setLists([...lists, newItem]);
      setName('');
      showAlert(true, 'success', ' Thêm Job thành công !')
    }
  }

  const showAlert = (show = false , type = '', msg = '') => {
    setAlert({show , type , msg});
  }

  const handleClearItem = () => {
    showAlert(true, 'danger', ' Dọn sạch job !')
    setLists([]);
  }
  const handleDeleteItem = (id) =>{
    showAlert(true, 'danger', 'xóa job thành công !')
    const jobs = lists.filter(item => item.id !== id)
    setLists(jobs)  
  }
  
  const handleEditItem = (id) =>{
    const updateJob = lists.find(item => item.id === id)
    document.querySelector('.grocery').focus();
    const nameEdit = updateJob.title;
    setIsUpdate(true)
    setIdEdit(id)
    setName(nameEdit)
  }

  useEffect(() =>{
    localStorage.setItem('lists',JSON.stringify(lists))
  },[lists])
 
  return (
      <div className='section-center'>
        <form className='grocery-form'>
          {alert.show && <Alert {...alert} removeAlert={showAlert} list = {lists}/>}
          <h3> Grocery Bud</h3>
          <div className='form-control'>
            <input  className="grocery" placeholder="e.g. eggs" 
              onChange={(e) => setName(e.target.value)} value={name} 
            />
            <button className="submit-btn" onClick={handleSubmit}>{isUpdate ? 'Eidt' : 'Submit'}</button>
          </div>
        </form>
        {lists.length > 0 && (
          <div className='grocery-container'>
          
          <List  list = {lists} 
            handleDeleteItem ={handleDeleteItem}
            handleEditItem = {handleEditItem}
          />

          <button  className='clear-btn' onClick={handleClearItem}>Clear Item</button>
        </div>
        )}
      </div>
  )
}

export default App
