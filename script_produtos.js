const tabela = document.getElementById("tabela_produtos");
const produtos = JSON.parse(localStorage.getItem("produtos"));
//verifca se array de produtos existe no localstore
if (!produtos) {
	localStorage.setItem("produtos", JSON.stringify([]));
	location.reload();
}
//preenche as tabela com dados
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
//funcao para editar o produto no modal
function editarProduto(id) {
	// Procura o produto pelo ID
	const produto = procuraProdutoById(id);
	// Abre o modal de edição
	var modal = new bootstrap.Modal(document.getElementById("modal_edicao"));
	const produtoId = document.getElementById("id-produto-editar");
	const nome = document.getElementById("produto-editar");
	const quantidade = document.getElementById("quantidade-editar");
	const descricao = document.getElementById("descricao-editar");

	// Preenche os campos do modal com os dados do produto
	nome.value = produto.produto;
	quantidade.value = produto.quantidade;
	descricao.value = produto.descricao;
	produtoId.value = id;

	// Exibe o modal
	modal.show();
}
//funcao paga apagar
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
//pega o formulario no html
const formulario_cadastro = document.getElementById("cadastro");
//add evento para ser executado quando o formulario foi enviado,salva dados no modal
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
//salva os dados editar
const formularioEditar = document.getElementById("editar_modal");
formularioEditar.addEventListener("submit", (event) => {
	event.preventDefault();
	const produtoId = document.getElementById("id-produto-editar").value;
	const produto = document.getElementById("produto-editar").value;
	const quantidade = document.getElementById("quantidade-editar").value;
	const descricao = document.getElementById("descricao-editar").value;

	let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

	produtos = produtos.map((produtoItem) =>
		produtoItem.id == produtoId
			? { ...produtoItem, produto, quantidade, descricao }
			: produtoItem
	);
	localStorage.setItem("produtos", JSON.stringify(produtos));
	location.reload();
});
//procura um produto baseado no id
function procuraProdutoById(id) {
	const produtos = JSON.parse(localStorage.getItem("produtos"));
	const found = produtos.find((produto) => {
		return produto.id == id;
	});
	return found;
}
