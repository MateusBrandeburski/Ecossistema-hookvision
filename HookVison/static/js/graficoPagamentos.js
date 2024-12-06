async function carregarDadosDoGrafico() {
  const dadosMockados = {
    acesso_liberado: { total: 34, label: "Released" },
    acesso_bloqueado: { total: 33, label: "Blocked" },
    acesso_negado: { total: 33, label: "Denied" },
  };

  const obterDadosReais = async () => {
    const resposta = await fetch("/grafico-status");
    return await resposta.json();
  };

  const criarGrafico = (dados) => {
    const options = {
      series: [
        dados.acesso_liberado.total,
        dados.acesso_bloqueado.total,
        dados.acesso_negado.total,
      ],
      chart: { width: 380, type: "pie" },
      title: { text: "", align: "center", floating: true, offsetY: -5 },
      subtitle: { text: "", align: "center", offsetY: 10 },
      labels: [
        dados.acesso_liberado.label,
        dados.acesso_bloqueado.label,
        dados.acesso_negado.label,
      ],
      colors: ["#28a745", "#ffc107", "#dc3545"],
      legend: { position: "bottom", horizontalAlign: "center", offsetY: 10 },
      stroke: { show: true, width: 2, colors: ["rgb(71, 71, 71)"] },
      responsive: [
        {
          breakpoint: 480,
          options: { chart: { width: 300 }, legend: { position: "bottom" } },
        },
      ],
    };
    return new ApexCharts(document.querySelector("#chart-status"), options);
  };

  let chart = criarGrafico(dadosMockados);
  chart.render();

  const dadosReais = await obterDadosReais();
  if (dadosReais) {
    chart.updateSeries([
      dadosReais.acesso_liberado.total,
      dadosReais.acesso_bloqueado.total,
      dadosReais.acesso_negado.total,
    ]);

    chart.updateOptions({
      labels: [
        dadosReais.acesso_liberado.label,
        dadosReais.acesso_bloqueado.label,
        dadosReais.acesso_negado.label,
      ],
    });
  }
}

await carregarDadosDoGrafico();
