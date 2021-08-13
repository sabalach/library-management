/* eslint-disable no-restricted-syntax */
function cleanObj(oldObj) {
  const obj = { ...oldObj };
  for (const propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      // eslint-disable-next-line no-param-reassign
      delete obj[propName];
    }
  }
  return obj;
}

module.exports = cleanObj;
