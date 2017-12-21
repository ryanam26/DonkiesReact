/**
 * Get all form values and return object.
 */

export default function formToObject(form) {
  let res = {};
  for (let el of form.elements) {
    let value = el.value;
    if (typeof value === "string") {
      value = value.trim();
    }
    res[el.name] = value;
  }
  return res;
}
