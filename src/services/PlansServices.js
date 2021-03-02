import ErrorHandler from 'utils/ErrorHandler';
import { loadStripe } from '@stripe/stripe-js';
import axios from '../loaders/axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY);

export const createCheckoutSession = async (priceId) => {
  try {
    if (!priceId) {
      throw new Error('Must include PriceId to create checkout session');
    }
    const body = {
      priceId,
    };
    const { data } = await axios.post('/plans/create-checkout-session', body);
    return data;
  } catch (error) {
    throw new ErrorHandler(error);
  }
};

export const initiateCheckoutSession = async (priceId) => {
  try {
    if (!priceId) {
      throw new Error('Must include PriceId to create checkout session');
    }
    const body = {
      priceId,
    };
    const { data } = await axios.post('/plans/create-checkout-session', body);
    const { sessionId } = data;
    if (!sessionId) {
      throw new Error('Something went wrong creating your checkout');
    }

    const stripe = await stripePromise;
    stripe.redirectToCheckout({ sessionId });
  } catch (error) {
    throw new ErrorHandler(error);
  }
};

export const onSubscriptionComplete = async (sessionId) => {
  try {
    if (!sessionId) {
      throw new Error('No checkout session id.');
    }
    const { data } = await axios.post('/plans/subscription-complete', {
      sessionId,
    });
    return data;
  } catch (error) {
    throw new ErrorHandler(error);
  }
};

export const getCheckoutSession = async (sessionId) => {
  try {
    if (!sessionId) {
      throw new Error('Missing Session ID');
    }
    const { data } = await axios.get('/plans/checkout-session', {
      params: {
        sessionId,
      },
    });
    return data;
  } catch (error) {
    throw new ErrorHandler(error);
  }
};

export const redirectToCustomerPortal = async () => {
  try {
    const { data } = await axios.get('/plans/customer-portal');
    window.location.href = data.url;
  } catch (error) {
    throw new ErrorHandler(error);
  }
};

export const something = () => {};
