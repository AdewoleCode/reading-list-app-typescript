import { create } from "zustand";

export type Book = {
    key: string,
    title: string,
    author_name: string[],
    first_public_year: number,
    number_of_pages_median: number | null,
    status: "done" | "inProgress" | "backlog"
}

interface BookState {
    books: Book[]
}

interface Bookstore extends BookState {
    addBook: (newBook: Book) => void
    removeBook: (bookToRemove: Book) => void
    moveBook: (bookToMove: Book, newStatus: Book['status']) => void
    reOrderBooks: (listType: Book['status'], startIndex: number, endIndex: number) => void
    loadBooksFromLocalStorage: () => void
}

const InitialBooks: Book[] = [
    {
        key: "/works/OL875437W",
        author_name: ["Stephen Chbosky"],
        first_public_year: 1992,
        number_of_pages_median: 231,
        status: "backlog",
        title: "The Perks of Being a Wallflower"
    },
    {
        key: "/works/OL22255847W",
        author_name: ["Eric Jorgenson"],
        first_public_year: 2017,
        number_of_pages_median: 242,
        status: "inProgress",
        title: "The Almanack of Naval Ravikant"
    },
    {
        key: "/works/OL14933414W",
        author_name: ["J.R.R. Tolkien"],
        first_public_year: 2009,
        number_of_pages_median: 496,
        status: "done",
        title:  "The Fellowship of the Ring"        
    },
    {
        key: "/works/OL492658W",
        author_name: ["Rick Riordan"],
        first_public_year: 1999,
        number_of_pages_median: 377,
        status: "backlog",
        title: "Percy Jackson & the Olympians"
    },
    {
        key: "/works/OL1968368W",
        author_name: ["Robert Greene", "Joost Elffers"],
        first_public_year: 2006,
        number_of_pages_median:452,
        status: "inProgress",
        title: "The 48 Laws of Power"
    },
    {
        key: "/works/OL29115502W",
        author_name: ["Saki", "Jan Oliveira"],
        first_public_year: 2012,
        number_of_pages_median: 216,
        status: "done",
        title: "Beasts and Super-Beasts"
    },
    {
        key: "/works/OL2765872W",
        author_name: ["Emily A. Vander Veer"],
        first_public_year: 1992,
        number_of_pages_median: 375,
        status: "backlog",
        title: "JavaScript for dummies"
    }
]


export const useStore = create<Bookstore>((set) => ({
    books: [],

    addBook: (newBook) =>
        set((state: BookState) => {
            const updatedBooks: Book[] = [...state.books, {
                ...newBook, status: 'backlog'
            }]

            localStorage.setItem('readingList', JSON.stringify(updatedBooks))
            return { books: updatedBooks }
        }),

    removeBook: (bookToRemove) =>
        set((state: BookState) => {
            console.log(bookToRemove);

            const updatedBooks = state.books.filter((book) => book.key !== bookToRemove.key)

            localStorage.setItem('readingList', JSON.stringify(updatedBooks))
            return { books: updatedBooks }
        }),

    moveBook: (bookToMove, newStatus) =>
        set((state: BookState) => {
            const updatedBooks: Book[] =
                state.books.map(book => book.key === bookToMove.key ? { ...book, status: newStatus } : book)

            localStorage.setItem('readingList', JSON.stringify(updatedBooks))
            return { books: updatedBooks }
        }),

    reOrderBooks: (listType, startIndex, endIndex) =>
        set((state: BookState) => {
            const filteredBooks = state.books.filter(book => book.status === listType)

            const [reorderedBook] = filteredBooks.splice(startIndex, 1)

            filteredBooks.splice(endIndex, 0, reorderedBook)

            const updatedBooks = state.books.map(book => book.status === listType ? filteredBooks.shift() || book : book)
            localStorage.setItem('readingList', JSON.stringify(updatedBooks))

            return { books: updatedBooks }
        }),

    loadBooksFromLocalStorage: () => {

        const storedBooks = localStorage.getItem("readingList")
        if (storedBooks) {
            set({ books: JSON.parse(storedBooks) })

        } else {
            set({ books: InitialBooks })
        }
    },
}))