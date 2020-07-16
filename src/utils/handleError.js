const handleError = (e) => {
  const error = {};
    error.message = e.message || 'Something went wrong... ';
    if ([404].indexOf(e?.response?.status) !== -1) {
      error.message = e.response.data.message;
    };
  return { error };
};

export default handleError;
