function formatReal(value) {
  let formatter = new Intl.NumberFormat([], {
    style: "currency",
    currency: "BRL",
  });
  return formatter.format(value);
}
export { formatReal };
