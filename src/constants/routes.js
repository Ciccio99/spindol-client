export default {
  home: '/',
  dashboard: '/',
  dailyDiary: '/daily-diary',
  data: '/data',
  account: '/settings',
  signIn: '/signin',
  register: '/register',
  checkIn: '/check-in',
  plans: '/plans',
  renew: '/renew',
  requestAccess: 'https://sleepwell.typeform.com/to/v2J1kw9E',
  landingPage: process.env.REACT_APP_LANDING_URL || 'https://spindol.com',
  termsOfService: process.env.REACT_APP_LANDING_URL
    ? `${process.env.REACT_APP_LANDING_URL}/terms-of-service`
    : 'https://spindol.com/terms-of-service',
  privacyPolicy: process.env.REACT_APP_LANDING_URL
    ? `${process.env.REACT_APP_LANDING_URL}/privacy-policy`
    : 'https://spindol.com/privacy-policy',
};
