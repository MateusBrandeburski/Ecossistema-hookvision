async function carregarDadosDoGrafico() {
  const resposta = await fetch('/grafico-status');
  const dados = await resposta.json();

  const options = {
    series: [dados.acesso_liberado.total, dados.acesso_bloqueado.total, dados.acesso_negado.total],
    chart: {
      width: 380,
      type: 'pie',
    },
    title: {
      text: '',
      align: 'center',
      floating: true,
      offsetY: -5// Ajusta a posição vertical do título
    },
    subtitle: {
      text: '',
      align: 'center',
      offsetY: 10 // Ajusta a posição vertical do subtítulo
    },
    labels: [dados.acesso_liberado.label, dados.acesso_bloqueado.label, dados.acesso_negado.label],
    colors: ['#28a745', '#ffc107', '#dc3545'],
    legend: {
      position: 'bottom', // Posiciona a legenda na parte inferior
      horizontalAlign: 'center', // Centraliza a legenda
      offsetY: 10 // Ajusta a posição vertical da legenda para não sobrepor o gráfico
    },
    stroke: {
      show: true, // Habilita as bordas
      width: 2, // Define a espessura da borda
      colors: ['rgb(71, 71, 71)'] // Define a cor da borda (no caso, branco)
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  var chart = new ApexCharts(document.querySelector("#chart-status"), options);
  chart.render();
};

carregarDadosDoGrafico();
