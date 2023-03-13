import "../assets/style/modal.css";
import { useState } from "react";
function ModalComponent(props) {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    // toggle modal state
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  return (
    <>
      <button
        className="btn-modal bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600 text-center w-fit p-1"
        onClick={toggleModal}
      >
        more details
      </button>
      {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <h2 className="mt-2">{props.modal.namn}</h2>
            <p className="mt-2">{props.modal.beskrivning}</p>
            <button
              className="close-modal bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600 text-center"
              onClick={toggleModal}
            >
              close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default ModalComponent;
