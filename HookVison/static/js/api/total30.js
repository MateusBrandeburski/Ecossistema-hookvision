
async function total30() {
    const resposta = await fetch('/grafico-total30');
    const dados = await resposta.json();
    const elemento = document.getElementById('total30');

    const numeroFormatado = new Intl.NumberFormat('pt-BR').format(dados.total);

    elemento.textContent = `${numeroFormatado}`;
}

total30();