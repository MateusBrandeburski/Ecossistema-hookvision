let search = '';
let limit = 10;
let offset = 0;

const textoBusca = document.getElementById('textoBusca');
const tableBody = document.querySelector("#table-body");
let debounceTimer;

function setLoading(isLoading) {
    if (isLoading) {
        tableBody.classList.add('loading');
        renderLoader(); // Renderiza linhas fictícias para o loader
    } else {
        tableBody.classList.remove('loading');
    }
}

function renderLoader() {
    tableBody.innerHTML = ""; // Limpa o conteúdo da tabela
    for (let i = 0; i < limit; i++) {
        const row = document.createElement("tr");
        row.classList.add('fade-effect'); // Aplica o efeito de fade-in
        row.innerHTML = `
            <td colspan="8">
                <div id="container">
                    <div id="container-card"></div>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    }
}

function fetchPaginatedData() {
    setLoading(true); // Ativa o estado de carregamento
    fetch(`/table?search=${encodeURIComponent(search)}&limit=${limit}&offset=${offset}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            renderTable(data);  
            togglePrevButton();
        })
        .catch(error => {
            console.error("Erro ao buscar dados:", error);
        })
        .finally(() => {
            setLoading(false); // Desativa o estado de carregamento
        });
}

// Lida com a digitação do usuário, realizando busca com debounce
textoBusca.addEventListener('input', (event) => {
    search = event.target.value.trim();

    // Só faz a requisição se o texto for maior ou igual a 2 caracteres
    if (search.length >= 2) {
        clearTimeout(debounceTimer);  // Limpa o timer anterior, caso o usuário continue digitando
        debounceTimer = setTimeout(() => {
            fetchPaginatedData();  // Chama a função após um atraso (debounce)
        }, 300);  // Atraso de 300ms
    }
});

function nextPage() {
    offset += limit;
    fetchPaginatedData();
}

function prevPage() {
    if (offset >= limit) {  // Impede que o offset seja negativo
        offset -= limit;
        fetchPaginatedData();
    }
}

function togglePrevButton() {
    const prevButton = document.querySelector("#prev-button");
    prevButton.disabled = (offset === 0);  // Desabilita o botão se o offset for 0
}

function renderTable(data) {
    tableBody.innerHTML = "";  // Limpa os dados anteriores

    if (data.length === 0) {
        const row = document.createElement("tr");  // Criando uma linha para a mensagem
        const cell = document.createElement("td");  // Criando uma célula
        cell.colSpan = 8;  // Faz a célula ocupar todas as colunas da tabela
        cell.innerHTML = "Nenhum resultado encontrado";
        cell.classList.add('no-results');   // Mensagem a ser exibida
        row.appendChild(cell);  // Adiciona a célula à linha
        tableBody.appendChild(row);  // Adiciona a linha ao corpo da tabela
    } else {
        // Caso contrário, renderiza os dados
        data.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.nome}</td>
                <td>${item.email}</td>
                <td>${item.status}</td>
                <td>${item.status_no_sistema}</td>
                <td>${item.valor}</td>
                <td>${item.forma_pagamento}</td>
                <td>${item.parcelas}</td>
                <td>${item.data}</td>
            `;
            tableBody.appendChild(row);
        });
    }
}

document.querySelector("#next-button").addEventListener("click", nextPage);
document.querySelector("#prev-button").addEventListener("click", prevPage);
fetchPaginatedData();


// # tem que improtar o css