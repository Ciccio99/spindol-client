/* eslint-disable import/prefer-default-export */
export const SUBS =
  process.env.REACT_APP_ENV === 'production'
    ? {
        standard: {
          monthly: {
            price: 9.99,
            priceId: 'price_1IQJTIHTjrDKdTifuVzeGE0g',
          },
          yearly: {
            price: 7.99,
            priceId: 'price_1IQJTIHTjrDKdTifyzdSAd6V',
          },
        },
        premium: {
          monthly: {
            price: 29.99,
            priceId: 'price_1IQJTCHTjrDKdTif59K1y1r4',
          },
          yearly: {
            price: 23.99,
            priceId: 'price_1IQJTCHTjrDKdTife4gpKH2K',
          },
        },
      }
    : {
        standard: {
          monthly: {
            price: 9.99,
            priceId: 'price_1INSIJHTjrDKdTifDV9OnFf4',
          },
          yearly: {
            price: 7.99,
            priceId: 'price_1INhW5HTjrDKdTifTVedZayE',
          },
        },
        premium: {
          monthly: {
            price: 29.99,
            priceId: 'price_1INSIcHTjrDKdTifa25zUBB2',
          },
          yearly: {
            price: 23.99,
            priceId: 'price_1INhV3HTjrDKdTifxiXiWciP',
          },
        },
      };
