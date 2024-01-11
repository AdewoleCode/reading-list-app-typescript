import { useEffect, useState } from 'react'
import './App.css'
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

  return (
    <div className='app'>
      <BookSearch onAddBook={addBook} />
      <BookList books={books} onMoveBook={bookToMove} />
    </div>
  )
}

export default App