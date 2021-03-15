// const ACTIVE_SUB_STATUSES = ['active', 'trialing', 'past_due'];
const SUB_TYPE = {
  PREMIUM: 'premium',
  STANDARD: 'standard',
};

export const isSubscriptionActive = (user) => {
  if (!user) {
    return false;
  }

  // Short circuit to make service free
  return true;

  // const { id, status } = user?.stripe?.subscription || {};

  // if (!id || !status) {
  //   return false;
  // }

  // if (ACTIVE_SUB_STATUSES.includes(status)) {
  //   return true;
  // }

  // return false;
};

export const isSubscriptionPremium = (user) => {
  if (!user) {
    return false;
  }

  const { id, status, type } = user?.stripe?.subscription || {};

  if (!id || !status) {
    return false;
  }

  if (type === SUB_TYPE.PREMIUM) {
    return true;
  }

  return false;
};

export const isSubscriptionStandard = (user) => {
  if (!user) {
    return false;
  }

  const { id, status, type } = user?.stripe?.subscription || {};

  if (!id || !status) {
    return false;
  }

  if (type === SUB_TYPE.STANDARD) {
    return true;
  }

  return false;
};
