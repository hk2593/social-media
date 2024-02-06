import React,{ useState } from 'react'
import { useDispatch } from 'react-redux';
import {addTodo} from '../features/todo/todoSlice'


const AddTodo = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const dispatch=useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo(inputValue))
    setInputValue('')
  };
  return (
    <form onSubmit={handleSubmit}>
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      placeholder="Enter a new todo..."
    />
    <button type="submit">Add Todo</button>
    </form>
  )
}

export default AddTodo

