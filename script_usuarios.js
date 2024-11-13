const tabela = document.getElementById("tabela_usuarios")
const usuarios = JSON.parse(localStorage.getItem("usuarios"))

for (let index = 0; index < usuarios.length; index++) {
    const usuario = usuarios[index];
    const linha = `
        <tr>
            <td>${usuario.id}</td>
            <td>${usuario.email}</td>
            <td>${usuario.senha}</td>
            <td class="text-center">
                <div class="btn btn-warning">Editar</div>
                <div class="btn btn-danger">Apagar</div>
            </td>
        </tr>
    `
    tabela.innerHTML += linha
}

