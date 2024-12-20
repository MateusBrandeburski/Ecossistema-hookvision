let search = '';
let limit = 10;
let offset = 0;

const textoBusca = document.getElementById('textoBusca');

let debounceTimer;

function fetchPaginatedData() {
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
    const tableBody = document.querySelector("#table-body");
    const mobileTable = document.querySelector("#mobile-table");
    tableBody.innerHTML = "";  // Limpa os dados anteriores
    mobileTable.innerHTML = "";  // Limpa o mobile também

    if (data.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 8;
        cell.innerHTML = "Nenhum resultado encontrado";
        cell.classList.add('no-results');
        row.appendChild(cell);
        tableBody.appendChild(row);

        // Mensagem no mobile
        const noResultsMessage = document.createElement("div");
        noResultsMessage.classList.add('mobile-card');
        noResultsMessage.innerHTML = "<p>Nenhum resultado encontrado</p>";
        mobileTable.appendChild(noResultsMessage);
    } else {
        data.forEach(item => {
            // Tabela para desktop
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

            // Exibição para o mobile
            const mobileCard = document.createElement("div");
            mobileCard.classList.add('mobile-card');
            mobileCard.innerHTML = `
                <div><span>Nome:</span> ${item.nome}</div>
                <div><span>Email:</span> ${item.email}</div>
                <div><span>Status da transação:</span> ${item.status}</div>
                <div><span>Status no sistema:</span> ${item.status_no_sistema}</div>
                <div><span>Valor:</span> ${item.valor}</div>
                <div><span>Forma de pagamento:</span> ${item.forma_pagamento}</div>
                <div><span>Parcelas:</span> ${item.parcelas}</div>
                <div><span>Data e hora:</span> ${item.data}</div>
            `;
            mobileTable.appendChild(mobileCard);
        });
    }
}

document.querySelector("#next-button").addEventListener("click", nextPage);
document.querySelector("#prev-button").addEventListener("click", prevPage);
fetchPaginatedData();
