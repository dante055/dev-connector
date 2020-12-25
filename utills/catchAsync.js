// Takes a async (or a promise returning) function and returns a new function capableof catching errors
module.exports = fn => {
  return (req, res, next) => {
    // fn(req, res, next).catch(err => next(err));
    fn(req, res, next).catch(next);
  };
};
