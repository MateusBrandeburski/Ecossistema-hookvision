async function total30() {

    const resposta = await fetch('/grafico-total30');
    const dados = await resposta.json();

    const numeroFormatado = new Intl.NumberFormat('pt-BR').format(dados.total);
    const totalDB = document.getElementById('container-card');

    // Criando um novo elemento
    const novoSpan = document.createElement('span');
    novoSpan.id = 'container-card'; // Reaplica o mesmo ID
    novoSpan.className = 'm-2'; // Define a classe
    novoSpan.style.backgroundColor = 'aliceblue'; // Define o estilo
    novoSpan.textContent = numeroFormatado; // Adiciona o conteúdo

    // Substitui o elemento antigo pelo novo
    totalDB.replaceWith(novoSpan);
    
}

total30();
