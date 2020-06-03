export default {
  api_uri: process.env.REACT_APP_API_URI,
  oauth2: {
    api_uri: process.env.REACT_APP_API_URI,
    oura: {
      client_id: process.env.OURA_CLIENT_ID,
    },
  },
  ga: {
    trackingId: process.env.GA_TRACKING_ID,
  },
  hotjar: {
    trackingId: process.env.HOTJAR_TRACKING_ID,
  },
};
