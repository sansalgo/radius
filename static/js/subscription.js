// Set your publishable key: remember to change this to your live publishable key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
let stripe = Stripe('pk_test_51Ks0jRCzX1BKhEVgIOW29GKejnQBwH9rnOmOXBtJVCBmZ6DWogLOSCTsPSGDOgC4Gctd3XWcGKwdJZaJpREnbZf3004ZL5w4WS');
let elements = stripe.elements();
var style = {
  base: {
    color: '#45A29E',
    fontWeight: '600',
    lineHeight: '60px',
    fontFamily: 'Poppins',
    fontSize: '15px',

    '::placeholder': {
      color: '#45A29E',
    },
  },

  invalid: {
    color: '#69FCF2',

    '::placeholder': {
      color: '#45A29E',
    },
  },

};

// set card elements and properties
var cardNumber = elements.create('cardNumber', {
  style: style,
  placeholder: 'Card Number',
  
})
cardNumber.mount('#card-number')

var cardExpiry = elements.create('cardExpiry', {
  style: style,
  placeholder: 'Expiration',
  
})
cardExpiry.mount('#card-expiry')

var cardCvc = elements.create('cardCvc', {
  style: style,
  placeholder: 'CVC',
  
})
cardCvc.mount('#card-cvc')

// to display errors
cardNumber.on('change', function(event) {
  displayError(event);
});
cardExpiry.on('change', function(event) {
  displayError(event);
});
cardCvc.on('change', function(event) {
  displayError(event);
});

// on clicking the submit button, call the payment function to generate the payment
let form = document.getElementById('payment-form');
form.addEventListener('submit', function (ev) {
  ev.preventDefault();
  
  createPaymentMethod({ cardNumber });
});

// payment function
function createPaymentMethod({ cardNumber }) {
  // Set up payment method for recurring usage
  
  stripe.createPaymentMethod({
      type: 'card',
      card: cardNumber,
    })
    .then((result) => {
      if (result.error) {
        displayError(result);
      } else {
        const paymentParams = {
          paymentMethodId: result.paymentMethod.id,
          priceId: document.getElementById('priceId').innerHTML,
        };

        let button  = document.querySelector('#payment-form .submit-cover button');
        button.innerHTML = 'Wait';
        button.style.opacity = 0.5;
        button.disabled = true;
        
        createSubscription(paymentParams);
      }
    });
  }

// function to create a subscription
function createSubscription({ paymentMethodId, priceId }) {

    return (
      fetch('/create-subscription', {
       method: 'POST',
       headers: {
         'Content-type': 'application/json',
         'X-CSRFToken':'{{ csrf_token }}',
       },
       credentials: 'same-origin',
       body: JSON.stringify({
          paymentMethodId: paymentMethodId,
          priceId: priceId,
        }),
     })
     .then((response) => {
       return response.json();
     })
     // If the card is declined, display an error to the user.
     .then((result) => {
       if (result.error) {
         console.log("The card had an error when trying to attach it to a customer.");
         // The card had an error when trying to attach it to a customer.
         throw result;
        }
       return result;
     })
     .then((result) => {

          window.location.href = '/congratulations';

      })
     .catch((error) => {
       // an error has happened. Display the failure to the user here.
       // we utilize the HTML element we created.
       // showCardError(error);
       displayError(error)
       return console.log(error+" " + paymentMethodId +" "+ priceId);
     })
)}

// error function
function displayError(event) {
  // changeLoadingStatePrices(false);
  let displayError = document.getElementById('card-element-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
}
