import { useState } from 'react';
import './ProductList.css';
import CartItem from '../cart/CartItem';
import { plantsArray } from './datas';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../../state/CartSlice';
import AboutUs from '../about/AboutUs';

function ProductList({ handleGetStartedClick }) {
  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(false); // State to control the visibility of the About Us page
  const [addedToCart, setAddedToCart] = useState({});

  console.log('🚀 ~ ProductList ~ addedToCart:', addedToCart['Snake Plant']);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  console.log('🚀 ~ ProductList ~ cart:', cart);

  const styleObj = {
    backgroundColor: '#6f7a70',
    color: '#fff!important',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignIems: 'center',
    fontSize: '20px',
  };
  const styleObjUl = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '1100px',
  };

  const styleA = {
    color: 'white',
    fontSize: '30px',
    textDecoration: 'none',
  };

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    setAddedToCart((prevState) => ({
      ...prevState,
      [product.name]: true,
    }));
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true); // Set showCart to true when cart icon is clicked
    setShowPlants(false);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowPlants(true); // Set showAboutUs to true when "About Us" link is clicked
    setShowCart(false); // Hide the cart when navigating to About Us
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
    setShowPlants(false);
  };

  return (
    <div>
      <div className="navbar" style={styleObj}>
        <div className="tag">
          <div className="luxury">
            <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
            <button style={{ cursor: 'pointer', fontSize: '1rem', background: 'none', textDecoration: 'none', border: 'none' }} onClick={handleGetStartedClick}>
              <div>
                <h3 style={{ color: 'white' }}>Hamzah Nursery</h3>
                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
              </div>
            </button>
          </div>
        </div>
        <div style={styleObjUl}>
          <div>
            <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>
              Plants
            </a>
          </div>
          <div>
            <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}>
              <h1 className="cart" style={{ position: 'relative' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="68" width="68">
                  <rect width="156" height="156" fill="none"></rect>
                  <circle cx="80" cy="216" r="12"></circle>
                  <circle cx="184" cy="216" r="12"></circle>
                  <path
                    d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                    fill="none"
                    stroke="#faf9f9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    id="mainIconPathAttribute"
                  ></path>
                </svg>
                <span style={{ position: 'absolute', top: '20%', left: '40%', fontSize: '2rem' }}>{cart.length}</span>
              </h1>
            </a>
          </div>
        </div>
      </div>
      {showPlants ? (
        <div className="product-grid">
          <AboutUs />
        </div>
      ) : (
        ''
      )}
      {!showCart && !showPlants ? (
        <div className="product-grid">
          {plantsArray.map((product, i) => (
            <div key={i.toString()}>
              <h1 style={{ textAlign: 'center' }}>{product.category}</h1>
              <div className="product-list">
                {product.plants.map((plant) => (
                  <div key={plant.name} className="product-card">
                    <img className="product-image" src={plant.image} alt="plant image product" />
                    <div className="product-title">{plant.name}</div>
                    <p className="product-price">{plant.cost}</p>
                    <p className="product-list">{plant.description}</p>
                    <button className="product-button" style={{ backgroundColor: addedToCart[plant.name] ? 'grey' : '#4CAF50' }} onClick={() => handleAddToCart(plant)} disabled={addedToCart[plant.name]}>
                      {addedToCart[plant.name] ? 'Added to cart' : 'Add to cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} setAddedToCart={setAddedToCart} />
      )}
    </div>
  );
}

export default ProductList;
