import axios from "axios"
import { useState } from "react"
import "./BookSearch.css"

export type Book = {
    key: string,
    title: string,
    author_name: string[],
    first_public_year: string,
    number_of_pages_median: string | null,
    status: "done" | "inProgress" | "backlog"
}

type SearchResult = {
    docs: Book[],
    numberOfResult: number
}

const BookSearch = ({ onAddBook }: { onAddBook: (book: Book) => void }) => {


    const [query, setQuery] = useState<any>('')
    const [results, setResults] = useState<Book[]>([])
    const [loading, setLoading] = useState(false)
    const [totalResult, setTotalResult] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const resultsPerPage = 15

    const searchBook = async (page: number = 1) => {

        if (!query) return

        setLoading(true)
        try {

            const response =
                await axios.get<SearchResult>(`https://openlibrary.org/search.json?q=${query}&page=${page}&limit=${resultsPerPage}`)
            setResults(response.data.docs)
            setTotalResult(response.data.numberOfResult)
            setCurrentPage(page)

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

    const handlePreviousClick = () => {
        if (currentPage > 1) {
            searchBook(currentPage - 1)
        }
    }

    const handleNextClick = () => {
        if (currentPage < Math.ceil(totalResult / resultsPerPage)) {
            searchBook(currentPage + 1)
        }
    }


    return (
        <div className="book-search-container">
            <div className="search-btn-input">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search For Your Next Book"
                    onKeyUp={handleKeyPress}
                />
                <button
                    onClick={() => searchBook()}
                    disabled={loading}
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
                        results?.map((book, index) => {
                            return (
                                <div
                                    className="book-item"
                                    key={index}
                                >
                                    <p className="title">{book.title}</p>
                                    <p className="author">{book.author_name}</p>
                                    <p>{book.first_public_year}</p>
                                    <p>{book.number_of_pages_median || "-"}</p>
                                    <button
                                    className="book-item-btn"
                                        onClick={() => onAddBook({
                                            key: book.key,
                                            title: book.title,
                                            author_name: book.author_name,
                                            first_public_year: book.first_public_year,
                                            number_of_pages_median: book.number_of_pages_median || null,
                                            status: "backlog"
                                        })}
                                    >
                                        Add Book
                                    </button>
                                </div>

                            )
                        })
                    }
                </div>

                {/* <div className="button-prev-next-box">
                    <button
                        className="prev-btn"
                        disabled={loading || currentPage <= 1}
                        onClick={handlePreviousClick}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage}</span>
                    <button
                        className="next-btn"
                        onClick={handleNextClick}
                        disabled={loading || (currentPage >= Math.ceil(totalResult / resultsPerPage))}
                    >
                        Next
                    </button>
                </div> */}
            </div>
        </div>
    )
}

export default BookSearch