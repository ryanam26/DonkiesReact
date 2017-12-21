export default (base, methods = []) => {
  /*

    Example:
      base = USER
      methods = [GET, POST, {LOGIN: [SUCCESS, ERROR]}]

   */
  let res = {};
  base = base.toUpperCase();
  for (var index = 0; index < methods.length; index += 1) {
    let method = methods[index];
    if (typeof method === typeof {}) {
      for (let key in method) {
        let upperCaseKey = key.toUpperCase();
        res[upperCaseKey] = {};
        for (
          let methodIndex = 0;
          methodIndex < method[key].length;
          methodIndex += 1
        ) {
          let subMethod = method[key][methodIndex].toUpperCase();
          res[upperCaseKey][subMethod] = `${base}_${upperCaseKey}_${subMethod}`;
        }
      }
    } else {
      method = method.toUpperCase();
      res[method] = `${base}_${method}`;
    }
  }
  return res;
};
