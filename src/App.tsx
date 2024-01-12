import { useEffect, useState } from 'react'
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookSearch, { Book } from './component/bookSearch/BookSearch'
import BookList from './component/bookList/BookList'

function App() {

  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    const storedBooks = localStorage.getItem("readingList")
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks))
    }
  }, [])


  const addBook = (newBook: Book) => {
    const updatedBooks: Book[] = [...books, {
      ...newBook, status: 'backlog'
    }]

    setBooks(updatedBooks)

    localStorage.setItem('readingList', JSON.stringify(updatedBooks))
  }

  const bookToMove = (bookToMove: Book, newStatus: Book["status"]) => {
    const updatedBooks: Book[] = books.map(book => book.key === bookToMove.key ? { ...book, status: newStatus } : book)

    setBooks(updatedBooks)

    localStorage.setItem('readingList', JSON.stringify(updatedBooks))

  }

  const bookToRemove = (bookToRemove: Book) => {
    console.log(bookToRemove);

    const updatedBooks = books.filter((book) => book.key !== bookToRemove.key)

    setBooks(updatedBooks)
    localStorage.setItem('readingList', JSON.stringify(updatedBooks))
  }

  const reorderBooks = (listType: Book["status"], startIndex: number, endIndex: number) => {

    const filteredBooks = books.filter(book => book.status == listType)

    const [reorderedBook] = filteredBooks.splice(startIndex, 1)

    filteredBooks.splice(endIndex, 0, reorderedBook)

    const updatedBooks = books.map(book => book.status === listType ? filteredBooks.shift() || book : book)
    localStorage.setItem('readingList', JSON.stringify(updatedBooks))

  }


  return (
    <div className='app'>
      <BookSearch
        onAddBook={addBook}
      />
      <BookList
        books={books}
        onMoveBook={bookToMove}
        onRemoveBook={bookToRemove}
        onReorderBooks={reorderBooks}
      />
      <ToastContainer />
    </div>
  )
}

export default App
