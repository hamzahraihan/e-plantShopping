import { useState } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import './modal.css';

const customStyles = {
  overlay: {
    zIndex: 99,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '99',
    position: 'absolute',
  },
};
Modal.setAppElement(document.getElementById('modal'));

// eslint-disable-next-line react/prop-types
function ModalComponent({ totalAmount }) {
  const { cart } = useSelector((state) => state.cart);
  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [inputForm, setInputForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });
  console.log(inputForm);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const url = 'http://localhost:3000/midtrans';

  const handleCheckoutShopping = async (e) => {
    e.preventDefault();
    try {
      setInputForm();
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({
          cart,
          totalAmount,
          first_name: inputForm.first_name,
          last_name: inputForm.last_name,
          email: inputForm.email,
          phone: inputForm.phone,
        }),
      });
      if (!response.ok) {
        throw new Error('error');
      }
      const { token } = await response.json();
      window.snap.pay(token);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <button disabled={cart.length == 0} className="get-started-button1" onClick={openModal}>
        Checkout
      </button>
      <Modal ariaHideApp={false} id="modal" isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 100 }}>
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Insert your personal data</h2>
          <button className="close-button" onClick={closeModal}>
            close
          </button>
        </div>
        <div>Insert your personal data</div>
        <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={(e) => handleCheckoutShopping(e)}>
          <label htmlFor="first_name">
            <input type="text" id="first_name" value={inputForm?.first_name} onChange={(e) => setInputForm({ ...inputForm, first_name: e.target.value })} />
          </label>
          <label htmlFor="last_name">
            <input type="text" id="last_name" value={inputForm?.last_name} onChange={(e) => setInputForm({ ...inputForm, last_name: e.target.value })} />
          </label>
          <label htmlFor="email">
            <input type="email" id="email" value={inputForm?.email} onChange={(e) => setInputForm({ ...inputForm, email: e.target.value })} />
          </label>
          <label htmlFor="phone">
            <input type="number" id="phone" value={inputForm?.phone} onChange={(e) => setInputForm({ ...inputForm, phone: e.target.value })} />
          </label>
          <button type="submit" className="get-started-button1">
            Checkout
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default ModalComponent;
