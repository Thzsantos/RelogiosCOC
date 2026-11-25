const API = "http://localhost:3002";
 
function mostrar(tela) {
   
    document.getElementById('cadastro').classList.add("hidden");
    document.getElementById('login').classList.add("hidden");
    document.getElementById('logado').classList.add("hidden");
    document.getElementById('msg').innerText = "";
    document.getElementById(tela).classList.remove("hidden");
}
 
 
function msg(texto, tipo) {
 
    const el = document.getElementById("msg");
    el.innerText = texto;
    el.className = tipo;
};
 
async function cadastrar() {

    const nome = document.getElementById("nomeCad").value;
    const email = document.getElementById("emailCad").value;
    const senha = document.getElementById("senhaCad").value;

    try {
        const res = await fetch(`${API}/cadastrar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
        });

        const data = await res.json();

        if (res.ok) {
            msg(data.msg, "sucesso");
            setTimeout(() => mostrar('login'), 1000);
        } else {
            msg(data.msg, "erro");
        }
    } catch (erro) {
        console.error("Erro ao cadastrar:", erro);
        msg("Erro ao conectar com o servidor", "erro");
    }
}

async function login() {

    const email = document.getElementById("emailLog").value;
    const senha = document.getElementById("senhaLog").value;

    try {
        const res = await fetch(`${API}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("token", data.token);
            document.getElementById("bemVindo").innerText = `Bem-vindo, ${data.usuario.nome}!`;
            mostrar('logado');
            msg(data.msg, "sucesso");
        } else {
            msg(data.msg, "erro");
        }
    } catch (erro) {
        console.error("Erro ao fazer login:", erro);
        msg("Erro ao conectar com o servidor", "erro");
    }
}

function sair() {
    localStorage.removeItem("token");
    mostrar('login');
}
 