import { Book } from "../bookSearch/BookSearch";
import "./ConfirmationModal.css"
// import { Bounce } from 'react-reveal';


interface confirmationProps {
    openConfirmation: boolean;
    setOpenConfirmation: (openConfirmation: boolean) => void;
    onRemoveBook: (book: Book) => void
    book: Book
}

const ConfirmationModal =
    ({ openConfirmation, setOpenConfirmation, onRemoveBook, book }: confirmationProps) => {


        return (
            openConfirmation &&
            // <Bounce center duration={1500}>
            <div className="confirmation-modal-box">
                <div className="confirmation-modal-wrapper">
                    <h3>Are you sure you want to remove book from list?</h3>
                    <div className="btn-confirm-box">
                        <button
                            className="confirm-btn"
                            onClick={() => {
                                onRemoveBook(book)
                                setOpenConfirmation(!openConfirmation)
                            }}
                        >
                            Yes
                        </button>
                        <button
                            className="cancel-btn"
                            onClick={() => setOpenConfirmation(false)}
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
            // </Bounce>
        )
    }


export default ConfirmationModal