async function carregarDadosDoGrafico() {
  const dadosMockados = {
    acesso_liberado: { total: 10, label: 'Liberado' },
    acesso_bloqueado: { total: 5, label: 'Bloqueado' },
    acesso_negado: { total: 2, label: 'Negado' }
  };

  const obterDadosReais = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const resposta = await fetch('/grafico-status');
        const dadosReais = await resposta.json();
        resolve(dadosReais);
      } catch (erro) {
        reject('Erro ao carregar os dados reais: ' + erro);
      }
    });
  };

  const criarGrafico = (dados) => {
    const options = {
      series: [dados.acesso_liberado.total, dados.acesso_bloqueado.total, dados.acesso_negado.total],
      chart: { width: 380, type: 'pie' },
      title: { text: '', align: 'center', floating: true, offsetY: -5 },
      subtitle: { text: '', align: 'center', offsetY: 10 },
      labels: [dados.acesso_liberado.label, dados.acesso_bloqueado.label, dados.acesso_negado.label],
      colors: ['#28a745', '#ffc107', '#dc3545'],
      legend: { position: 'bottom', horizontalAlign: 'center', offsetY: 10 },
      stroke: { show: true, width: 2, colors: ['rgb(71, 71, 71)'] },
      responsive: [{ breakpoint: 480, options: { chart: { width: 300 }, legend: { position: 'bottom' } } }]
    };
    return new ApexCharts(document.querySelector("#chart-status"), options);
  };

  const dados = await obterDadosReais();
  const chart = criarGrafico(dados);
  chart.render();
}

carregarDadosDoGrafico();
