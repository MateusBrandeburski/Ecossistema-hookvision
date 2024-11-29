async function carregarDadosDoGrafico() {

    const resposta = await fetch('/grafico-total');
    const dados = await resposta.json();
    console.log(dados);

    const dates = [];
    const valores = [];
    
    dados.registros.forEach(item => { 
        dates.push(new Date(item.data).getTime()); 
        valores.push(item.total);
    });


    var options = {
        series: [{
            name: dados.tooltip,
            data: valores,
        }],
        chart: {
            type: 'area',
            stacked: false,
            height: 350,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false, // Desabilita o zoom no gráfico
            },
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
        },
        title: {
            text: dados.title,
            align: 'center'
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100]
            },
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return val.toFixed(0); // Exibe o valor como número inteiro
                },
            },
            title: {
                text: dados.subtitle
            },
        },
        xaxis: {
            type: 'datetime',
            categories: dates // Usando os timestamps das datas
        },
        tooltip: {
            shared: false,
            y: {
                formatter: function (val) {
                    return val.toFixed(0); // Exibe o valor como número inteiro
                }
            }
        }
    };

    // Renderizando o gráfico
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}

// Chama a função para carregar o gráfico com dados da API
carregarDadosDoGrafico();
