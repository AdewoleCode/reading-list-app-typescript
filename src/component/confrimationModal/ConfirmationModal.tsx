import { toast } from "react-toastify";
import { Book } from "../../../store";
import "./ConfirmationModal.css"
import {Bounce} from "react-reveal"


interface confirmationProps {
    openConfirmation: boolean;
    setOpenConfirmation: (openConfirmation: boolean) => void;
    onRemoveBook: (book: Book) => void
    book: Book
}

const ConfirmationModal =
    ({ openConfirmation, setOpenConfirmation, onRemoveBook, book }: confirmationProps) => {

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
            openConfirmation &&
            <Bounce center duration={1000}>
                <div className="confirmation-modal-box">
                    <div className="confirmation-modal-wrapper">
                        <h3>Are you sure you want to permanently remove book from list?</h3>
                        <div className="btn-confirm-box">
                            <button
                                className="confirm-btn"
                                onClick={() => {
                                    onRemoveBook(book)
                                    toastAlert('deleted Successfully')
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
             </Bounce>
        )
    }


export default ConfirmationModal