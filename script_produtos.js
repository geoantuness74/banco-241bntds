const tabela = document.getElementById("tabela_produtos");
const produtos = JSON.parse(localStorage.getItem("produtos"));

if (!produtos) {
	localStorage.setItem("produtos", JSON.stringify([]));
	location.reload();
}

for (let index = 0; index < produtos.length; index++) {
	const produto = produtos[index];
	const linha = `
        <tr>
            <td>${produto.id}</td>
            <td>${produto.produto}</td>
            <td>${produto.quantidade}</td>
						<td>${produto.descricao}</td>
            <td class="text-center">
                <div class="btn btn-warning" onClick="editarProduto(${produto.id})">Editar</div>
                <div class="btn btn-danger" onClick="apagarProduto(${produto.id})">Apagar</div>
            </td>
        </tr>
    `;
	tabela.innerHTML += linha;
}

function editarProduto(id) {
	const produto = procuraProdutoById(id);
	// abrir modal do id modal_cadastro
	var modal = new bootstrap.Modal(document.getElementById("modal_edicao"));
	const produtoeditar = document.getElementById("produto-editar");
	const quantidadeeditar = document.getElementById("quantidade-editar");
	const descricaoeditar = document.getElementById("descricao-editar");

	produtoeditar.value = produto.produto;
	quantidadeeditar.value = produto.quantidade;
	descricaoeditar.value = produto.descricao;

	modal.show(); //
}

function apagarProduto(id) {
	Swal.fire({
		title: "Tem certeza?",
		text: "Você não poderá desfazer está ação",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Sim, apagar",
		cancelButtonText: "Cancelar",
	}).then((result) => {
		if (result.isConfirmed) {
			const produtoAremover = produtos.findIndex(
				(produto) => produto.id == id
			);
			produtos.splice(produtoAremover, 1);
			localStorage.setItem("produtos", JSON.stringify(produtos));
			location.reload();
		}
	});
}

const formulario_cadastro = document.getElementById("cadastro");

formulario_cadastro.addEventListener("submit", (event) => {
	event.preventDefault();
	const quantidadeDigitada = document.getElementById(
		"quantidade-cadastro"
	).value;
	const descricaoDigitada =
		document.getElementById("descricao-cadastro").value;
	const produtoDigitado = document.getElementById("produto-cadastro").value;

	let produtos = JSON.parse(localStorage.getItem("produtos"));
	const ultimoID = produtos[produtos.length - 1]?.id || 0;
	const produtoAdd = {
		id: ultimoID + 1,
		produto: produtoDigitado,
		quantidade: quantidadeDigitada,
		descricao: descricaoDigitada,
	};

	produtos.push(produtoAdd);
	localStorage.setItem("produtos", JSON.stringify(produtos));
	location.reload();
});

function procuraProdutoById(id) {
	const produtos = JSON.parse(localStorage.getItem("produtos"));
	const found = produtos.find((produto) => {
		return produto.id == id;
	});
	return found;
}
