const compareObjects = (x, y) => {
  if (x === y) return true;

  if (!(x instanceof Object) || !(y instanceof Object)) return false;

  if (x.constructor !== y.constructor) return false;

  for (var p in x) { // eslint-disable-line
    if (!x.hasOwnProperty(p)) continue; // eslint-disable-line

    if (!y.hasOwnProperty(p)) return false; // eslint-disable-line

    if (x[p] === y[p]) continue; // eslint-disable-line

    if (typeof (x[p]) !== 'object') return false;

    if (!compareObjects(x[p], y[p])) return false;
  }

  for (p in y) { // eslint-disable-line
    if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false; // eslint-disable-line
  }
  return true;
};

export default compareObjects;
