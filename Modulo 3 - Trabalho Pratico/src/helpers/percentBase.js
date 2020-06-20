function percentBase(total, part) {
  let percent = Math.round((part / total) * 10000, 4) / 100;
  return percent;
}

function value_and_percent(value, percent) {
  let view = String(value) + " (" + String(percent) + "%)";
  return view;
}

module.exports = {
  percentBase: percentBase,
  value_and_percent: value_and_percent,
};
