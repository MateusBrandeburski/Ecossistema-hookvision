function carregarDadosGraficoLucroPerdas() {
    // Dados mockados para a renderização inicial
    const dadosMockados = {
        aprovado: 10,
        reembolsado: 5,
        recusado: 2,
        label_aprov: 'Aprovado',
        label_reem: 'Reembolsado',
        label_recus: 'Recusado',
        title: 'Lucro e Perdas (Mock)'
    };

    const formatarValor = (valor) => {
        return valor.toLocaleString('pt-BR').replace(',', '.') + 'K'; // Formata o valor para pt-BR
    };

    // Função para criar o gráfico
    const criarGrafico = (dados, titulo = 'Lucro e Perdas') => {
        const aprovado = formatarValor(dados.aprovado);
        const reembolsado = formatarValor(dados.reembolsado);
        const recusado = formatarValor(dados.recusado);

        const options = {
            series: [{
                data: [dados.aprovado, dados.reembolsado, dados.recusado],
            }],
            chart: {
                type: 'bar',
                height: 380,
                toolbar: {
                    show: false
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
                categories: [dados.label_aprov, dados.label_reem, dados.label_recus],
            },
            yaxis: {
                labels: {
                    show: true
                }
            },
            title: {
                text: titulo,
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
                            return '';
                        }
                    }
                }
            },
            legend: {
                show: false
            }
        };

        return new ApexCharts(document.querySelector("#chartLucroPerdas"), options);
    };

    // Cria o gráfico com dados mockados
    let chart = criarGrafico(dadosMockados);
    chart.render();

    // Função que retorna uma Promise com os dados reais
    const obterDadosReais = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const resposta = await fetch('/grafico-lucro-perdas');
                const dadosReais = await resposta.json();
                resolve(dadosReais);
            } catch (erro) {
                reject('Erro ao carregar os dados reais: ' + erro);
            }
        });
    };

    // Chama a Promise para obter os dados reais e atualizar o gráfico
    obterDadosReais()
        .then(dadosReais => {
            // Atualiza o gráfico com os dados reais
            chart.updateOptions({
                series: [{
                    data: [dadosReais.aprovado, dadosReais.reembolsado, dadosReais.recusado],
                }],
                xaxis: {
                    categories: [dadosReais.label_aprov, dadosReais.label_reem, dadosReais.label_recus],
                },
                title: {
                    text: dadosReais.title,
                }
            });
        })
        .catch(erro => {
            console.error(erro); // Exibe erro caso falhe na obtenção dos dados
        });
}

carregarDadosGraficoLucroPerdas();
