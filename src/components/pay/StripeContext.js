import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your_publishable_key_here');

const StripeContext = ({ children }) => (
  <Elements stripe={stripePromise}>{children}</Elements>
);

export default StripeContext;