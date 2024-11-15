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

const formulario_cadastro = document.getElementById("cadastro")

formulario_cadastro.addEventListener("submit", (event) => {
    event.preventDefault()
    const senhaDigitada = document.getElementById("senha-cadastro").value
    const confirmacaoSenha = document.getElementById("senha-cadastro-2").value 
    const emailDigitado = document.getElementById("email-cadastro").value

    console.log(senhaDigitada, confirmacaoSenha, emailDigitado)

    if (senhaDigitada != confirmacaoSenha) {
        // Alerta de erro
        Swal.fire("As senhas devem ser iguais");
        // Quebrar a função
        return
    }

    const hasEmailCadastrado = procuraUsuarioByEmail(emailDigitado)
    if (hasEmailCadastrado) {
        // alerta erro
        Swal.fire("Já existe esse email no nosso banco de dados");
        // Quebra funçao
        return
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios"))
    const ultimoID = usuarios[usuarios.length -1]?.id || 0
    const usuarioAdd = {
        id: ultimoID + 1,
        email: emailDigitado,
        senha: senhaDigitada
    }
    
    usuarios.push(usuarioAdd)
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
})

function procuraUsuarioByEmail (emailDigitado) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios"))
    const found = usuarios.find((usuario) => {
        return usuario.email == emailDigitado 
    })
    return found
}

