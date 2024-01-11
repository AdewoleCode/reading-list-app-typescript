import { Book } from '../bookSearch/BookSearch'
import "./BookList.css"

const BookList = ({ books, onMoveBook }:
    { books: Book[], onMoveBook: (book: Book, targetList: Book["status"]) => void }) => {

    return (
        <div className='bookListContainer'>
            <h2>My Reading List</h2>
            <div>
                {
                    books?.map((book) => {
                        return (
                            <div className='book-item' key={book.key}>
                                <div className="left">
                                    <h3>{book.title}</h3>
                                    <p>{book.author_name}</p>
                                </div>
                                <div className="right">
                                    <p>{book.number_of_pages_median || "-"}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default BookList