async function carregarDadosDoGrafico() {
  
  const dadosMockados = {
    registros: [
      { data: "2024-11-01", total: 1123 },
      { data: "2024-11-02", total: 846 },
      { data: "2024-11-03", total: 1500 },
      { data: "2024-11-04", total: 658 },
      { data: "2024-11-05", total: 1204 },
      { data: "2024-11-06", total: 931 },
      { data: "2024-11-07", total: 1405 },
      { data: "2024-11-08", total: 1119 },
      { data: "2024-11-09", total: 502 },
      { data: "2024-11-10", total: 712 },
      { data: "2024-11-11", total: 1408 },
      { data: "2024-11-12", total: 634 },
      { data: "2024-11-13", total: 1035 },
      { data: "2024-11-14", total: 899 },
      { data: "2024-11-15", total: 748 },
      { data: "2024-11-16", total: 1305 },
      { data: "2024-11-17", total: 1500 },
      { data: "2024-11-18", total: 1234 },
      { data: "2024-11-19", total: 1112 },
      { data: "2024-11-20", total: 402 },
      { data: "2024-11-21", total: 758 },
      { data: "2024-11-22", total: 902 },
      { data: "2024-11-23", total: 1401 },
      { data: "2024-11-24", total: 1300 },
      { data: "2024-11-25", total: 876 },
      { data: "2024-11-26", total: 1258 },
      { data: "2024-11-27", total: 1379 },
      { data: "2024-11-28", total: 1500 },
      { data: "2024-11-29", total: 1020 },
      { data: "2024-11-30", total: 905 },
    ],
    title: "Transaction Movemente",
    subtitle: "Quantity of Transactions"
  };

  const obterDadosReais = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const resposta = await fetch("/grafico-total");
        const dadosReais = await resposta.json();
        resolve(dadosReais);
      } catch (erro) {
        reject("Erro ao carregar os dados reais: " + erro);
      }
    });
  };

  const criarGrafico = (dados) => {
    const dates = [];
    const valores = [];
    dados.registros.forEach((item) => {
      dates.push(new Date(item.data).getTime());
      valores.push(item.total);
    });

    const options = {
      series: [
        {
          name: dados.tooltip,
          data: valores,
        },
      ],
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        zoom: { type: "x", enabled: true, autoScaleYaxis: true },
        toolbar: { show: false },
      },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      title: { text: dados.title, align: "center" },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val.toFixed(0);
          },
        },
        title: { text: dados.subtitle },
      },
      xaxis: {
        type: "datetime",
        categories: dates,
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return val.toFixed(0);
          },
        },
      },
    };

    return new ApexCharts(document.querySelector("#chart"), options);
  };

  let chart = criarGrafico(dadosMockados);
  chart.render();

  const dadosReais = await obterDadosReais();
  if (dadosReais) {
    const dates = [];
    const valores = [];
    dadosReais.registros.forEach((item) => {
      dates.push(new Date(item.data).getTime());
      valores.push(item.total);
    });

    chart.updateSeries([
      {
        name: dadosReais.tooltip,
        data: valores,
      },
    ]);

    chart.updateOptions({
      title: { text: dadosReais.title, align: "center" },
      yaxis: { title: { text: dadosReais.subtitle } },
      xaxis: { categories: dates },
    });
  }
}

carregarDadosDoGrafico();
