import { Book } from '../../../store'
import "./BookList.css"
import ConfirmationModal from '../confrimationModal/ConfirmationModal'
import { useEffect, useState } from 'react'
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'
import { useStore } from '../../../store'
import { MdOutlineDeleteSweep } from "react-icons/md";
import { SlBookOpen } from "react-icons/sl";
import { SiBookstack } from "react-icons/si";
import { FaBookSkull } from "react-icons/fa6";
import { toast } from "react-toastify"

const BookList = ({ showDialog, setShowDialog }: any) => {
    const { books, moveBook, removeBook, reOrderBooks } = useStore(state => state)

    const moveToList = (book: Book, targetList: Book["status"]) => {
        moveBook(book, targetList)
    }

    const [openConfirmation, setOpenConfirmation] = useState<boolean>(false)
    const [book, setBook] = useState<Book | any>()

    useEffect(() => {
        console.log(books);
    }, [])

    const confirmRemove = (book: Book) => {
        setBook(book)
        setOpenConfirmation(true)
    }

    const onDragEnd = (result: DropResult) => {

        console.log(result);
        const { source, destination } = result

        if (!destination) return

        const sourceIndex = source.index
        const destinationIndex = destination.index

        const listType = source.droppableId as Book["status"]
        reOrderBooks(listType, sourceIndex, destinationIndex)
    }

    const toastAlert = (toastMsg: any) => {
        toast.success(toastMsg,
            {
                position: "bottom-right",
                autoClose: 2500,
                pauseOnHover: true,
                draggable: true,
                theme: "dark"
            }
        )
    }


    return (
        <div className='bookListContainer'>

            <div className="head">
                <h2>My Reading List</h2>

                <button
                    className='add-new-book-btn'
                    onClick={() => setShowDialog(!showDialog)}
                >
                    Add New Book
                </button>
            </div>


            <div className='box-progress'>
                <p className='box-sort-heading'>Currently Reading <SlBookOpen style={{ width: '30px', height: '25px' }} /></p>
                <DragDropContext onDragEnd={onDragEnd}>
                    {
                        books?.filter((book) => book.status == 'inProgress').length > 0 ? (
                            <div>
                                <Droppable droppableId='inProgress' >
                                    {(provided) => (
                                        <div {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >

                                            {books.filter((book) => book.status == 'inProgress').map((book, index) => {
                                                return (
                                                    <Draggable
                                                        draggableId={book.key}
                                                        key={book.key}
                                                        index={index}
                                                    >
                                                        {(provided) => (
                                                            <div
                                                                {...provided.dragHandleProps}
                                                                {...provided.draggableProps}
                                                                ref={provided.innerRef}
                                                            >
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
                                                                                <MdOutlineDeleteSweep className='icon-del' />
                                                                            </button>
                                                                        </div>
                                                                        <div className="move-btn-box">
                                                                            <button
                                                                                onClick={() => {
                                                                                    moveToList(book, "inProgress")
                                                                                }
                                                                                }
                                                                                disabled={book.status == "inProgress"}
                                                                            >
                                                                                <SlBookOpen style={{ width: '22px', height: '30px', color: 'grey' }} />
                                                                            </button>
                                                                            <button
                                                                                onClick={() => {
                                                                                    toastAlert(`moved to READ LATER list`)
                                                                                    moveToList(book, "backlog")
                                                                                }}
                                                                            >
                                                                                <SiBookstack style={{ width: '25px', height: '35px', color: '#fff' }} />
                                                                            </button>
                                                                            <button
                                                                                onClick={() => {
                                                                                    toastAlert(`moved to DONE READING list`)
                                                                                    moveToList(book, "done")
                                                                                }}
                                                                            >
                                                                                <FaBookSkull style={{ width: '22px', height: '30px', color: '#fff' }} />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                            })}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        ) : <h2>You are not reading any books currently! search and add your favorite books!</h2>
                    }
                </DragDropContext>
                <ConfirmationModal
                    openConfirmation={openConfirmation}
                    setOpenConfirmation={setOpenConfirmation}
                    onRemoveBook={removeBook}
                    book={book}
                />
            </div >

            <div className='box-backlog'>
                <p className='box-sort-heading'>To Read Later < SiBookstack style={{ width: '30px', height: '25px' }} /></p>
                <DragDropContext onDragEnd={onDragEnd}>
                    {

                        books?.filter((book) => book.status == 'backlog').length > 0 ? (
                            <div>
                                <Droppable droppableId='backlog' >
                                    {(provided) => (
                                        <div {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {
                                                books?.filter((book) => book.status == 'backlog').map((book, index) => {
                                                    return (
                                                        <Draggable
                                                            draggableId={book.key}
                                                            key={book.key}
                                                            index={index}
                                                        >
                                                            {(provided) => (
                                                                <div
                                                                    {...provided.dragHandleProps}
                                                                    {...provided.draggableProps}
                                                                    ref={provided.innerRef}
                                                                >
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
                                                                                >
                                                                                    <MdOutlineDeleteSweep className='icon-del' />
                                                                                </button>
                                                                            </div>
                                                                            <div className="move-btn-box">
                                                                                <button
                                                                                    onClick={() => {
                                                                                        toastAlert(`moved to CURRENTLY READING list`)
                                                                                        moveToList(book, "inProgress")
                                                                                    }}
                                                                                >
                                                                                    <SlBookOpen style={{ width: '22px', height: '30px', color: '#fff' }} />
                                                                                </button>
                                                                                <button
                                                                                    onClick={() => moveToList(book, "backlog")}
                                                                                    disabled={book.status == "backlog"}
                                                                                >
                                                                                    <SiBookstack style={{ width: '25px', height: '35px', color: 'grey' }} />
                                                                                </button>
                                                                                <button
                                                                                    onClick={() => {
                                                                                        toastAlert(`moved to DONE READING list`)
                                                                                        moveToList(book, "done")
                                                                                    }}
                                                                                >
                                                                                    <FaBookSkull style={{ width: '22px', height: '30px', color: '#fff' }} />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}

                                                        </Draggable>
                                                    )
                                                })

                                            }
                                        </div>
                                    )
                                    }
                                </Droppable>
                            </div>
                        ) : <h2>there are no books on this list Currently!</h2>
                    }
                </DragDropContext>

            </div >

            <div className='box-done'>
                <p className='box-sort-heading'>Done Reading <FaBookSkull style={{ width: '30px', height: '22px' }} /></p>
                {

                    books.filter((book) => book.status == 'done').length > 0 ? (
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
                                                    <MdOutlineDeleteSweep className='icon-del' />
                                                </button>
                                            </div>
                                            <div className="move-btn-box">
                                                <button
                                                    onClick={() => {
                                                        toastAlert(`moved to CURRENTLY READING list`)
                                                        moveToList(book, "inProgress")
                                                    }}
                                                >
                                                    <SlBookOpen style={{ width: '22px', height: '30px', color: '#fff' }} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        toastAlert(`moved to READ LATER list`)
                                                        moveToList(book, "backlog")
                                                    }
                                                    }
                                                >
                                                    <SiBookstack style={{ width: '25px', height: '35px', color: '#fff' }} />
                                                </button>
                                                <button
                                                    onClick={() => moveToList(book, "done")}
                                                    disabled={book.status == "done"}
                                                >
                                                    <FaBookSkull style={{ width: '22px', height: '30px', color: 'grey' }} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : <h2>No books on this list!</h2>
                }
            </div >

        </div >
    )
}

export default BookList