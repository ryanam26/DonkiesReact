export default (base, methods = []) => {
  let res = {};
  for (var index = 0; index < methods.length; index += 1) {
    let method = methods[index].toUpperCase();
    res[method] = `${base.toUpperCase()}_${method}`;
  }
  return res;
};
