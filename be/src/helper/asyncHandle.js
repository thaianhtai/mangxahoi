// src/helpers/asyncHandle.js
module.exports = function asyncHandle(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
