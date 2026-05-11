const data = {
    "produtos": [
        {
            "id": 1,
            "nome": "Smartphone Galaxy S23",
            "preco": 3499.90,
            "categoria": "Celulares",
            "imagem": "https://via.placeholder.com/200x140?text=Galaxy+S23",
            "descricao": "Smartphone com 128GB de armazenamento, câmera de alta resolução e excelente desempenho.",
            "emEstoque": true
        },
        {
            "id": 2,
            "nome": "Notebook Dell Inspiron 15",
            "preco": 4599.00,
            "categoria": "Notebooks",
            "imagem": "https://via.placeholder.com/200x140?text=Dell+Inspiron",
            "descricao": "Notebook com processador Intel i7, 16GB de RAM e SSD de 512GB, ideal para trabalho e estudos.",
            "emEstoque": false
        },
        {
            "id": 3,
            "nome": "iPhone 14",
            "preco": 5999.00,
            "categoria": "Celulares",
            "imagem": "https://via.placeholder.com/200x140?text=iPhone+14",
            "descricao": "iPhone 14 com 128GB, tela Super Retina XDR e chip A15 Bionic.",
            "emEstoque": true
        },
        {
            "id": 4,
            "nome": "Playstation 5",
            "preco": 3899.00,
            "categoria": "Games",
            "imagem": "https://via.placeholder.com/200x140?text=PS5",
            "descricao": "Console Playstation 5 com SSD ultrarrápido e controle DualSense.",
            "emEstoque": true
        },
        {
            "id": 5,
            "nome": "Xbox Series X",
            "preco": 3699.00,
            "categoria": "Games",
            "imagem": "https://via.placeholder.com/200x140?text=Xbox+Series+X",
            "descricao": "Console Xbox Series X com 1TB de armazenamento e jogos em 4K.",
            "emEstoque": false
        },
        {
            "id": 6,
            "nome": "Notebook Lenovo Ideapad",
            "preco": 2999.00,
            "categoria": "Notebooks",
            "imagem": "https://via.placeholder.com/200x140?text=Lenovo+Ideapad",
            "descricao": "Notebook Lenovo com processador Ryzen 5, 8GB de RAM e SSD 256GB.",
            "emEstoque": true
        },
        {
            "id": 7,
            "nome": "Fone Bluetooth JBL",
            "preco": 299.90,
            "categoria": "Acessórios",
            "imagem": "https://via.placeholder.com/200x140?text=Fone+JBL",
            "descricao": "Fone de ouvido Bluetooth JBL com cancelamento de ruído e bateria de longa duração.",
            "emEstoque": true
        },
        {
            "id": 8,
            "nome": "Mouse Gamer Logitech",
            "preco": 199.90,
            "categoria": "Acessórios",
            "imagem": "https://via.placeholder.com/200x140?text=Mouse+Logitech",
            "descricao": "Mouse gamer Logitech com 16000 DPI e iluminação RGB.",
            "emEstoque": true
        },
        {
            "id": 9,
            "nome": "Motorola Edge 30",
            "preco": 2199.00,
            "categoria": "Celulares",
            "imagem": "https://via.placeholder.com/200x140?text=Moto+Edge",
            "descricao": "Smartphone Motorola Edge 30 com 256GB e tela OLED de 144Hz.",
            "emEstoque": true
        }
    ]
};

// pega elementos da pagina
const listaProdutos = document.getElementById("listaProdutos");
const areaDetalhes = document.getElementById("areaDetalhes");
const campoBusca = document.getElementById("campoBusca");
const filtroCategoria = document.getElementById("filtroCategoria");

// formata o preço pra reais
function formatarPreco(valor) {
    return "R$ " + valor.toFixed(2).replace(".", ",");
}

// cria um card de produto
function criarCardProduto(produto) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", produto.id);

    const imagem = document.createElement("img");
    imagem.setAttribute("src", produto.imagem);
    imagem.setAttribute("alt", produto.nome);
    card.appendChild(imagem);

    const estoqueTexto = produto.emEstoque
        ? '<span class="em-estoque">Em estoque</span>'
        : '<span class="sem-estoque">Sem estoque</span>';

    const conteudo = document.createElement("div");
    conteudo.innerHTML = `
        <h3>${produto.nome}</h3>
        <p>${formatarPreco(produto.preco)}</p>
        <p>${estoqueTexto}</p>
    `;
    card.appendChild(conteudo);

    // botao ver detalhes
    const botaoDetalhes = document.createElement("button");
    botaoDetalhes.innerHTML = "Ver detalhes";
    botaoDetalhes.addEventListener("click", function() {
        mostrarDetalhesProduto(produto.id);
    });
    card.appendChild(botaoDetalhes);

    // botao destacar
    const botaoDestacar = document.createElement("button");
    botaoDestacar.innerHTML = "Destacar";
    botaoDestacar.addEventListener("click", function() {
        card.classList.add("destacado");
        card.style.transform = "scale(1.02)";
    });
    card.appendChild(botaoDestacar);

    return card;
}

// renderiza a lista de produtos
function renderizarProdutos(produtos) {
    listaProdutos.innerHTML = "";

    if (produtos.length === 0) {
        listaProdutos.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
    }

    for (let i = 0; i < produtos.length; i++) {
        const card = criarCardProduto(produtos[i]);
        listaProdutos.appendChild(card);
    }

    // mostra os data-id de cada card no console depois de renderizar
    const todosCards = document.querySelectorAll(".card");
    console.log("Cards renderizados: " + todosCards.length);
    todosCards.forEach(function(c) {
        console.log("data-id do card: " + c.getAttribute("data-id"));
    });
}

// renderiza as categorias no select
function renderizarCategorias(produtos) {
    const categorias = [];
    for (let i = 0; i < produtos.length; i++) {
        if (!categorias.includes(produtos[i].categoria)) {
            categorias.push(produtos[i].categoria);
        }
    }

    for (let i = 0; i < categorias.length; i++) {
        const opcao = document.createElement("option");
        opcao.setAttribute("value", categorias[i]);
        opcao.innerHTML = categorias[i];
        filtroCategoria.appendChild(opcao);
    }
}

// mostra os detalhes de um produto
function mostrarDetalhesProduto(id) {
    const produto = data.produtos.find(function(p) {
        return p.id === id;
    });

    if (!produto) {
        return;
    }

    const estoqueTexto = produto.emEstoque ? "Sim" : "Não";

    areaDetalhes.innerHTML = `
        <h2>Detalhes do Produto</h2>
        <img src="${produto.imagem}" alt="${produto.nome}" style="width:200px;">
        <h3>${produto.nome}</h3>
        <p><strong>Categoria:</strong> ${produto.categoria}</p>
        <p><strong>Preço:</strong> ${formatarPreco(produto.preco)}</p>
        <p><strong>Descrição:</strong> ${produto.descricao}</p>
        <p><strong>Em estoque:</strong> ${estoqueTexto}</p>
    `;
}

// filtra os produtos por busca e categoria
function filtrarProdutos() {
    const textoBusca = campoBusca.value.toLowerCase();
    const categoriaSelecionada = filtroCategoria.value;

    const filtrados = data.produtos.filter(function(produto) {
        const nomeBate = produto.nome.toLowerCase().includes(textoBusca);
        const categoriaBate = categoriaSelecionada === "todas" || produto.categoria === categoriaSelecionada;
        return nomeBate && categoriaBate;
    });

    renderizarProdutos(filtrados);
}

// eventos
campoBusca.addEventListener("input", filtrarProdutos);
filtroCategoria.addEventListener("change", filtrarProdutos);

// inicializa a pagina
renderizarCategorias(data.produtos);
renderizarProdutos(data.produtos);
