exports.successResponse = (res, data, message = 'Success') => {
    return res.status(200).json({ message, data });
  };
  
  exports.errorResponse = (res, message, code = 500) => {
    return res.status(code).json({ message });
  };
  