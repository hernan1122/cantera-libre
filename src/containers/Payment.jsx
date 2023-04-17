import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from"@paypal/react-paypal-js";
import AppContext from '../context/AppContext';
import '../styles/containers/Payment.css';

export function Payment() {
  const { state, addNewOrder } = useContext(AppContext);
  const { cart, buyer } = state;
  const navigate = useNavigate()

  const paypalOtions = {
    clientId: 'AYpbs1xgAYRhzj95A_vmOmPfmSQG7QNX6G5TazQMLommifyOABg3Fogv4d9l1xTstrE_tT-UlJ_eo-B4',
    intent: 'capture',
    currency: 'USD'
  }

  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect'
  }

  const handlePaymentSuccess = (data) => {
    console.log(data);
    if (data.status === 'COMPLETED') {
      const newOrder = {
        buyer,
        product: cart,
        payment: data
      }
      addNewOrder(newOrder);
      navigate('/checkout/success')
    }
  }

  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  }

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen del pedido:</h3>
        {cart.map((item) => (
          <div className="Payment-item"key={item.title}>
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>
                $
                {' '}
                {item.price}
              </span>
            </div>
          </div>
        ))}
        <div className="Payment-button">
          <PayPalScriptProvider options={{ "client-id": "test" }} >
              <PayPalButtons 
                paypalOptions={paypalOtions}
                buttonStyles={buttonStyles}
                amount={handleSumTotal()}
                onClick={() => console.log('Start Payment')}
                onApprove={data => handlePaymentSuccess(data)}
                onError={error => console.log(error)}
                onCancel={data => console.log(data)}
                style={{ layout: "horizontal" }}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );

  /* return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen del pedido:</h3>
        {cart.map((item) => (
          <div className="Payment-item" key={item.title}>
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>
                $ {' '} {item.price}
              </span>
            </div>
          </div>
        ))}
        <div className="Payment-button">
          <PayPalButton
            paypalOptions={paypalOtions}
            buttonStyles={buttonStyles}
            amount={handleSumTotal()}
            onPaymentStart={() => console.log('Start Payment')}
            onPaymentSuccess={data => handlePaymentSuccess(data)}
            onPaymentError={error => console.log(error)}
            onPaymentCancel={data => console.log(data)}
          />
        </div>
      </div>
      <div />
    </div>
  ); */
}
