import { useEffect, useState } from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookSearch from './component/bookSearch/BookSearch'
import BookList from './component/bookList/BookList'
import { useStore } from "../store"
import "./App.css"


function App() {

  const { loadBooksFromLocalStorage } = useStore(state => state)
  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => {

    loadBooksFromLocalStorage()
  }, [loadBooksFromLocalStorage])

  return (

    <div className="app">
      <BookSearch
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
      <BookList
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
      <ToastContainer />
    </div>

  )
}

export default App
