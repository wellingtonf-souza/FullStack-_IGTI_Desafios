function juros(montante, taxa, periodo) {
  const parcelas = [];
  let montanteCurrent = Number(montante);
  const taxaCal = taxa / 100;

  for (let i = 1; i <= periodo; i++) {
    //prettier-ignore
    montanteCurrent = montanteCurrent + (montanteCurrent * taxaCal);
    parcelas.push({
      id: i,
      saldoAtual: montanteCurrent,
      PerdaGanho: montanteCurrent - montante,
      Porcentagem: ((montanteCurrent - montante) / montante) * 100,
    });
  }

  return parcelas;
}

function formatReal(value) {
  let formatter = new Intl.NumberFormat([], {
    style: "currency",
    currency: "BRL",
  });
  return formatter.format(value);
}

function valuePercent(value) {
  let view = value.toFixed(2) + "%";
  return view;
}

export { formatReal, valuePercent, juros };
