import { Book } from '../bookSearch/BookSearch'
import "./BookList.css"
import ConfirmationModal from '../confrimationModal/ConfirmationModal'
import { useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

const BookList = ({ books, onMoveBook, onRemoveBook, onReorderBooks }:
    {
        books: Book[], onMoveBook: (book: Book, targetList: Book["status"]) => void,
        onRemoveBook: (book: Book) => void,
        onReorderBooks: (listType: Book["status"], startIndex: number, endIndex: number) => void
    }) => {

    const moveToList = (book: Book, targetList: Book["status"]) => {
        onMoveBook(book, targetList)
    }

    const [openConfirmation, setOpenConfirmation] = useState<boolean>(false)
    // const [confirmDelete, setConfirmDelete] = useState<boolean>(false)
    const [book, setBook] = useState<Book | any>()


    const confirmRemove = (book: Book) => {
        setBook(book)
        setOpenConfirmation(true)
    }

    const onDragEnd = (result: DropResult) => {

        if (!result.destination) return

        const souceIndex = result.source.index
        const destinationIndex = result.destination.index

        const listType = result.source.droppableId as Book["status"]
        onReorderBooks(listType, souceIndex, destinationIndex)
    }

    return (
        <div className='bookListContainer'>
            <h2>My Reading List</h2>

            <div className='box-progress'>
                <p className='box-sort-heading'>In Progress</p>
                {
                    books.filter((book) => book.status == 'inProgress').length > 0 && (
                        <div>
                            {books.filter((book) => book.status == 'inProgress').map((book) => {
                                return (
                                    <div className='book-item' key={book.key}>
                                        <div className="reading-container">
                                            <div className="left">
                                                <h3>{book.title}</h3>
                                                <p>{book.author_name}</p>
                                            </div>

                                            <div className="right">
                                                <p>{book.first_public_year || "-"}</p>
                                            </div>
                                        </div>

                                        <div className="btn-box">
                                            <div className="remove-btn-box">
                                                <button
                                                    onClick={() => confirmRemove(book)}
                                                    className='remove-btn'
                                                >
                                                    Remove Book
                                                </button>
                                            </div>
                                            <div className="move-btn-box">
                                                <button
                                                    onClick={() => moveToList(book, "inProgress")}
                                                    disabled={book.status == "inProgress"}
                                                >
                                                    In Progress
                                                </button>
                                                <button
                                                    onClick={() => moveToList(book, "backlog")}
                                                >
                                                    Backlog
                                                </button>
                                                <button
                                                    onClick={() => moveToList(book, "done")}
                                                >
                                                    Done
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                }
                <ConfirmationModal
                    openConfirmation={openConfirmation}
                    setOpenConfirmation={setOpenConfirmation}
                    onRemoveBook={onRemoveBook}
                    book={book}
                />
            </div >

            <div className='box-backlog'>
                <p className='box-sort-heading'>Backlog</p>
                <DragDropContext onDragEnd={onDragEnd}>

                    {
                        books.filter((book) => book.status == 'backlog').length > 0 && (
                            <div>
                                {books.filter((book) => book.status == 'backlog').map((book) => {
                                    return (
                                        <div className='book-item' key={book.key}>
                                            <div className="reading-container">
                                                <div className="left">
                                                    <h3>{book.title}</h3>
                                                    <p>{book.author_name}</p>
                                                </div>

                                                <div className="right">
                                                    <p>{book.first_public_year || "-"}</p>
                                                </div>
                                            </div>

                                            <div className="btn-box">
                                                <div className="remove-btn-box">
                                                    <button
                                                        onClick={() => confirmRemove(book)}
                                                        className='remove-btn'
                                                    >
                                                        Remove Book
                                                    </button>
                                                </div>
                                                <div className="move-btn-box">
                                                    <button
                                                        onClick={() => moveToList(book, "inProgress")}
                                                    >
                                                        In Progress
                                                    </button>
                                                    <button
                                                        onClick={() => moveToList(book, "backlog")}
                                                        disabled={book.status == "backlog"}
                                                    >
                                                        Backlog
                                                    </button>
                                                    <button
                                                        onClick={() => moveToList(book, "done")}
                                                    >
                                                        Done
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    }
                </DragDropContext>

            </div >

            <div className='box-done'>
                <p className='box-sort-heading'>Done</p>
                {
                    books.filter((book) => book.status == 'done').length > 0 && (
                        <div>
                            {books.filter((book) => book.status == 'done').map((book) => {
                                return (
                                    <div className='book-item' key={book.key}>
                                        <div className="reading-container">
                                            <div className="left">
                                                <h3>{book.title}</h3>
                                                <p>{book.author_name}</p>
                                            </div>

                                            <div className="right">
                                                <p>{book.first_public_year || "-"}</p>
                                            </div>
                                        </div>

                                        <div className="btn-box">
                                            <div className="remove-btn-box">
                                                <button
                                                    onClick={() => confirmRemove(book)}
                                                    className='remove-btn'
                                                >
                                                    Remove Book
                                                </button>
                                            </div>
                                            <div className="move-btn-box">
                                                <button
                                                    onClick={() => moveToList(book, "inProgress")}
                                                >
                                                    In Progress
                                                </button>
                                                <button
                                                    onClick={() => moveToList(book, "backlog")}
                                                >
                                                    Backlog
                                                </button>
                                                <button
                                                    onClick={() => moveToList(book, "done")}
                                                    disabled={book.status == "done"}
                                                >
                                                    Done
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                }
            </div >
        </div >
    )
}

export default BookList