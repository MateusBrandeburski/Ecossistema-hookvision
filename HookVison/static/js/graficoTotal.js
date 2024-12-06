async function carregarDadosDoGrafico() {
    const dadosMockados = {
        registros: [
            { data: '2024-11-25', total: 20 },
            { data: '2024-11-26', total: 25 },
            { data: '2024-11-27', total: 30 }
        ],
        title: 'Gráfico Total',
        subtitle: 'Subtítulo do Gráfico',
        tooltip: 'Total de Registros'
    };

    const obterDadosReais = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const resposta = await fetch('/grafico-total');
                const dadosReais = await resposta.json();
                resolve(dadosReais);
            } catch (erro) {
                reject('Erro ao carregar os dados reais: ' + erro);
            }
        });
    };

    const criarGrafico = (dados) => {
        const dates = [];
        const valores = [];
        dados.registros.forEach(item => { 
            dates.push(new Date(item.data).getTime()); 
            valores.push(item.total);
        });

        const options = {
            series: [{
                name: dados.tooltip,
                data: valores,
            }],
            chart: {
                type: 'area',
                stacked: false,
                height: 350,
                zoom: { type: 'x', enabled: true, autoScaleYaxis: true },
                toolbar: { show: false },
            },
            dataLabels: { enabled: false },
            markers: { size: 0 },
            title: { text: dados.title, align: 'center' },
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
                    formatter: function (val) { return val.toFixed(0); }
                },
                title: { text: dados.subtitle }
            },
            xaxis: {
                type: 'datetime',
                categories: dates
            },
            tooltip: {
                shared: false,
                y: { formatter: function (val) { return val.toFixed(0); } }
            }
        };

        return new ApexCharts(document.querySelector("#chart"), options);
    };

    const dados = await obterDadosReais();
    const chart = criarGrafico(dados);
    chart.render();
}

carregarDadosDoGrafico();
