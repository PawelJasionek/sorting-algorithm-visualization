import { useState, useEffect } from 'react'
import './App.css'
import Column from './Column'

function App() {

  const [columns, setColumns] = useState([]);

  const generateColumns = () =>{
    const numbers = [];
    for(let i=50; i>=1; i--){
      numbers.push(i);
    }

    // setColumns(numbers);

    return numbers.map(number => <Column number={number} />);
  }

  // useEffect(()=>{
  //   generateColumns();
  // }, [])

  return (
    <main className='main-container'>
      <div className="column-container">
        {generateColumns()}
      </div>
    </main>
  )

}

export default App
