async function carregarDadosGraficoLucroPerdas() {
    const resposta = await fetch('/grafico-lucro-perdas'); 
    const dados = await resposta.json();


    const formatarValor = (valor) => {
        return valor.toLocaleString('pt-BR').replace(',', '.') + 'K';  // Usa o pt-BR para separador de milhar com ponto
    };

    const aprovado = formatarValor(dados.aprovado);
    const reembolsado = formatarValor(dados.reembolsado);
    const recusado = formatarValor(dados.recusado);

    var options = {
        series: [{
            data: [dados.aprovado, dados.reembolsado, dados.recusado], 
        }],
        chart: {
            type: 'bar',
            height: 380,
            toolbar: {
                show: false // Desabilita o menu de opções
            }
        },
        plotOptions: {
            bar: {
                distributed: true,
                horizontal: false, 
                dataLabels: {
                    position: 'center', 
                },
            }
        },
        colors: ['#28a745', '#ffc107', '#dc3545'],
        dataLabels: {
            enabled: true,
            textAnchor: 'middle',
            style: {
                colors: ['#000']
            },
            formatter: function (val) {
                return val.toLocaleString('pt-BR').replace(',', '.') + 'K'; 
            },
            offsetY: -10,
            dropShadow: {
                enabled: false
            }
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        xaxis: {
            categories: [dados.label_aprov, dados.label_reem , dados.label_recus], 
        },
        yaxis: {
            labels: {
                show: true 
            }
        },
        title: {
            text: dados.title,
            align: 'center',
            floating: true
        },
        subtitle: {
            text: '',
            align: 'center',
        },
        tooltip: {
            theme: 'dark',
            x: {
                show: true
            },
            y: {
                title: {
                    formatter: function () {
                        return ''
                    }
                }
            }
        },
        legend: {
            show: false 
        }
    };

    var chart = new ApexCharts(document.querySelector("#chartLucroPerdas"), options);
    chart.render();
}

carregarDadosGraficoLucroPerdas();
