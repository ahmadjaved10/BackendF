module.exports = (model) => async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
  
    const results = {};
    results.data = await model.find().limit(limit).skip(skip).exec();
    results.pagination = { page, limit };
  
    req.paginatedResults = results;
    next();
  };
  