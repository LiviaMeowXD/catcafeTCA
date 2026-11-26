const PUBLISHABLE_KEY = 'sb_publishable_9NYtazJZAj2wvPUPX-WWQg_PCeq0Wf1';
const API_URL = 'https://joqqetjjavhbrwwfibwb.supabase.co/rest/v1/reservas';

const HEADERS_BASE = {
    apikey: PUBLISHABLE_KEY,
    Accept: 'application/json'
};

// Variáveis do DOM
const form = document.querySelector('#form');
const inputId = document.querySelector('#id');
const cpf = document.querySelector('#cpf');
const nome = document.querySelector('#n1');
const data = document.querySelector('#d1');
const hora = document.querySelector('#h1');
const mesa = document.querySelector('#m1');
const msg = document.querySelector('#msg');
const list = document.querySelector('#list');

// Cache local das reservas
let local = [];

// READ - Buscar as reservas
async function buscarReservas() {
    try {
        const resposta = await fetch(`${API_URL}?select=*&order=id.asc`, {
            headers: HEADERS_BASE
        });

        if (!resposta.ok) {
            throw new Error(`HTTP ${resposta.status}`);
        }

        local = await resposta.json();
        renderReservas();
    } catch (error) {
        console.error('Erro ao buscar reservas:', error);
        list.innerHTML = '<p>Erro ao carregar os dados.</p>';
    }
}

// Renderizar os elementos na tela
function renderReservas() {
    list.innerHTML = '';

    if (local.length === 0) {
        list.innerHTML = '<p>Nenhuma reserva encontrada.</p>';
        return;
    }

    local.forEach(reserva => {
        list.innerHTML += `
            <div class="Reserva-card" id="Reserva-${reserva.id}">
                <h3>${reserva.cpf}</h3>
                <p><strong>Nome:</strong> ${reserva.nome}</p>
                <p><strong>Data:</strong> ${reserva.dia}</p>
                <p><strong>Hora:</strong> ${reserva.hora}</p>
                <p><strong>Mesa:</strong> ${reserva.id_mesa}</p>
                <div class="actions">
                    <button type="button" class="editar" onclick="editar(${reserva.id})">Editar</button>
                    <button type="button" class="deletar" onclick="deletar(${reserva.id})">Excluir</button>
                </div>
            </div>
        `;
    });
}

// CREATE / UPDATE - Salvar nova reserva ou atualizar existente
form.addEventListener('submit', salvarReserva);

async function salvarReserva(e) {
    e.preventDefault();

    const idEdicao = inputId.value;
    const reservaData = {
        cpf: cpf.value.trim(),
        nome: nome.value.trim(),
        dia: data.value,
        hora: hora.value,
        id_mesa: Number(mesa.value)
    };

    const estaEditando = Boolean(idEdicao);
    const endpoint = estaEditando
        ? `${API_URL}?id=eq.${encodeURIComponent(idEdicao)}`
        : API_URL;
    const metodo = estaEditando ? 'PATCH' : 'POST';

    try {
        const response = await fetch(endpoint, {
            method: metodo,
            headers: {
                ...HEADERS_BASE,
                'Content-Type': 'application/json',
                Prefer: 'return=representation'
            },
            body: JSON.stringify(reservaData)
        });

        if (!response.ok) {
            const erroTexto = await response.text();
            throw new Error(erroTexto || `HTTP ${response.status}`);
        }

        msg.innerHTML = estaEditando
            ? 'Reserva atualizada com sucesso!'
            : 'Reserva criada com sucesso!<br>Preencha o formulário novamente para criar outra reserva.';

        form.reset();
        inputId.value = '';
        list.classList.remove('oculto');
        await buscarReservas();
    } catch (error) {
        console.error('Erro ao salvar reserva:', error);
        msg.innerHTML = 'Erro ao salvar a reserva. Verifique os dados e o console.';
    }
}

// Preencher formulário para editar
window.editar = function (reservaId) {
    const reserva = local.find(item => item.id === reservaId);
    if (!reserva) return;

    list.classList.add('oculto');
    msg.innerHTML = 'Informe os valores abaixo para alterar a reserva';

    inputId.value = reserva.id;
    cpf.value = reserva.cpf;
    nome.value = reserva.nome;
    data.value = reserva.dia;
    hora.value = reserva.hora;
    mesa.value = reserva.id_mesa;
}

// DELETE - Excluir reserva
window.deletar = async function (reservaId) {
    if (!confirm('Deseja realmente excluir esta reserva?')) return;

    try {
        const url = new URL(API_URL);
        url.searchParams.set('id', `eq.${reservaId}`);

        const response = await fetch(url, {
            method: 'DELETE',
            headers: HEADERS_BASE
        });

        if (!response.ok) {
            const erroTexto = await response.text();
            throw new Error(erroTexto || `HTTP ${response.status}`);
        }

        msg.innerHTML = 'Reserva excluída com sucesso!';
        await buscarReservas();
    } catch (error) {
        console.error('Erro ao excluir reserva:', error);
        msg.innerHTML = 'Erro ao excluir a reserva.';
    }
}

// Carrega as reservas ao abrir a página
buscarReservas();