import { useState, useEffect, useMemo } from 'react'
import './App.css'
import Column from './Column'
import sortColumns from './SortColumns.jsx'

function App() {

  const [columns, setColumns] = useState([]);
  const [algorithm, setAlgorithm] = useState("selectionSort");


  const generateNumbers = () => {
    const numbers = [];
    for (let i = 50; i >= 1; i--) {
      numbers.push({ value: i, isCurrent: false, isLowest: false });
    }

    numbers.sort(() => Math.random() - 0.5);

    setColumns(numbers);
  }

  useEffect(() => {
    generateNumbers()
  }, [])

  const changeColumns = (newColumns) => {
    setColumns(newColumns);
  }

  return (
    <main className='main-container'>
      <label className='algorithm-label'>
        Pick a sorting algorithm
        <select name="selectedAlgorithm" onChange={e => setAlgorithm(e.target.value)}>
          <option value="selectionSort"> Selection Sort </option>
          <option value="bubbleSort"> Bubble Sort </option>
          <option value="insertionSort"> Insertion Sort </option>
          <option value="quickSort"> Quick Sort </option>
          <option value="mergeSort"> Merge Sort </option>
        </select>
      </label>
      <button
        className="button-sort"
        onClick={() => {
          sortColumns(algorithm, columns, changeColumns)
        }}>
        Sort
      </button>
      <div className="column-container">
        {columns.map(col => <Column {...col} />)}
      </div>
    </main>
  )

}

export default App
