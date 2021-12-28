// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_KEY);

const paymentIntent = await stripe.paymentIntents.create({
  amount: 1099,
  currency: 'eur',
  automatic_payment_methods: {enabled: true},
});

export default paymentIntent;