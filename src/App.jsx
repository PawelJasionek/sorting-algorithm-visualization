import { useState, useEffect, useMemo} from 'react'
import './App.css'
import Column from './Column'
import sortColumns from './SortColumns.jsx'

function App() {

  const [columns, setColumns] = useState([]);
  const [algorithm, setAlgorithm] = useState("selectionSort");


  const generateNumbers = () =>{
    const numbers = [];
    for(let i=50; i>=1; i--){
      numbers.push({value: i, isCurrent: false, isLowest: false});
    }

    setColumns(numbers);
  }

  useEffect(() =>{
    generateNumbers()
  }, [])

  const generateColumns = () => {
    const tempColumns = columns.map(col => <Column {...col} />)

    return tempColumns;
}

const generatedColumns = useMemo(()=> {
  return generateColumns()
}, [columns])

  const changeColumns = (newColumns) => {
    setColumns(prevColumns => [...newColumns]);
  }

  return (
    <main className='main-container'>
      <label className='algorithm-label'>
        Pick a fruit
        <select name="selectedAlgorithm" onChange={e => setAlgorithm(e.target.value)}>
            <option value="selectionSort"> Selection Sort </option>
            <option value="bubbleSort"> Bubble Sort </option>
            <option value="quickSort"> Quick Sort </option>
        </select>
      </label>
      <button
        className="button-sort"
        onClick={()=>{
          sortColumns(algorithm, columns, changeColumns)
          }}>
          Sort
      </button>
      <div className="column-container">
        {generatedColumns}
      </div>
    </main>
  )

}

export default App
