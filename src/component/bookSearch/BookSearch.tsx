import axios from "axios"
import { useEffect, useState } from "react"
import "./BookSearch.css"
import { toast } from "react-toastify"
import { Book, useStore } from "../../../store"
import Spinner from "../../component/spinner/Spinner"
import { FaList } from "react-icons/fa";
import { IoClose } from "react-icons/io5";


export const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
}

type SearchResult = {
    docs: Book[],
    numberOfResult: number
}

const BookSearch = ({ showDialog, setShowDialog }: any) => {

    const { books, addBook } = useStore(state => state)

    useEffect(() => {
        console.log(books);

    }, [])
    const [query, setQuery] = useState<any>('')
    const [results, setResults] = useState<Book[]>([])
    const [loading, setLoading] = useState(false)
    const resultsPerPage = 15

    const searchBook = async (page: number = 1) => {

        if (!query) return

        setLoading(true)
        try {

            const response =
                await axios.get<SearchResult>(`https://openlibrary.org/search.json?q=${query}&page=${page}&limit=${resultsPerPage}`)
            setResults(response.data.docs)

        } catch (error) {
            console.log('error fetching data', error);
        }
        setLoading(false)
    }

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            searchBook()
        }
    }

    const saveInfo = () => {
        toast.success('book listed successfully',
            {
                position: "bottom-right",
                autoClose: 1500,
                pauseOnHover: true,
                draggable: true,
                theme: "dark"
            }
        )
    }

    return (
        showDialog &&
        <div className="book-search-wrapper">
            <div className="book-search-container">
                <IoClose onClick={( ) => setShowDialog(!showDialog)} className="cancel-icon" />

                <div className="search-btn-input">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter Book Title or Author"
                        onKeyUp={handleKeyPress}
                    />
                    <button
                        onClick={() => searchBook()}
                        disabled={loading || !query}
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>
                </div>

                <div className="result-box">
                    <div>
                        <div className="book-header">
                            <ul>
                                <li className="head-title">Book Title</li>
                                <li className="head-author">Book Author</li>
                                <li className="head-pages">Pages</li>
                                <li className="head-add">-</li>
                            </ul>
                        </div>
                        {

                            results.length > 0 ? results.map((book, index) => {
                                return (
                                    <div
                                        className="book-item"
                                        key={index}
                                    >
                                        <p className="title">{book.title}</p>
                                        <p className="author">{book.author_name}</p>
                                        <p>{book.first_public_year || "-"}</p>
                                        <p>{book.number_of_pages_median || "-"}</p>
                                        <button
                                            className="book-item-btn"
                                            onClick={() => {
                                                saveInfo()
                                                addBook({
                                                    key: book.key,
                                                    title: book.title,
                                                    author_name: book.author_name,
                                                    first_public_year: book.first_public_year,
                                                    number_of_pages_median: book.number_of_pages_median || null,
                                                    status: "backlog"
                                                })
                                            }}
                                            disabled={books?.some(b => b.key === book.key)}
                                        >
                                            Add Book
                                        </button>
                                    </div>

                                )
                            })
                                :
                                loading ? <h2 className="no-result"> <Spinner /></h2>
                                    :
                                    <h2 className="no-result-two">
                                        <FaList style={{ width: '33spx', height: '35px' }} />
                                        Search For your favorite books and add to reading list!
                                    </h2>
                        }
                    </div>
                </div>

            </div>
        </div >
    )
}

export default BookSearch