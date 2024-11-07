const emailInput = document.getElementById("email")
const senhaInput = document.getElementById("senha")
const formulario = document.getElementById("form_id")

formulario.addEventListener("submit", (event) => {
    event.preventDefault()
    const emailDigitado = emailInput.value
    const senhaDigitada = senhaInput.value
    const procuraLocal = localStorage.getItem(emailDigitado)

    if (procuraLocal && procuraLocal === senhaDigitada) {
        Swal.fire({
            icon: "success",
            title: "Você entrou no sistema",
            showConfirmButton: false,
            timer: 1500
          });
    } else {
        Swal.fire({
            icon: "error",
            title: "Email ou Senha errados!",
            showConfirmButton: false,
            timer: 1500
          });
    }
})

