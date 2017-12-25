export default function thousandSeparator(num, separator) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}
