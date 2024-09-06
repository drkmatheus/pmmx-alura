function pesquisar() {
    console.log("Iniciando pesquisa"); // Mensagem de log indicando que a função de pesquisa começou a execução

    // Pega o valor do campo de input de texto e o converte para minúsculas para tornar a busca insensível a maiúsculas
    let pesquisa = document.querySelector('input[type="text"]').value.toLowerCase().trim();

    // Obtém a seção HTML onde os resultados da pesquisa serão exibidos
    let section = document.getElementById("resultados-pesquisa");

    // Lista de palavras que serão ignoradas na pesquisa (palavras comuns sem significado relevante para a busca)
    const stopWords = ['e', 'de', 'um', 'a', 'o', 'as', 'os', 'para', 'com', 'que'," "];
    
    // Função para remover palavras de parada do texto de pesquisa
    function removerStopWords(texto) {
        return texto.split(' ') // Divide o texto em palavras
                    .filter(palavra => !stopWords.includes(palavra)) // Remove palavras de parada
                    .join(' '); // Junta as palavras restantes em uma única string
    }
    
    // Remove palavras de parada do texto de pesquisa
    const pesquisaLimpa = removerStopWords(pesquisa);

    // Tenta obter o elemento de mensagem de erro, cria um se não existir
    let mensagemErro = document.getElementById("mensagem-erro");
    if (!mensagemErro) {
        mensagemErro = document.createElement("div"); // Cria um novo elemento div para a mensagem de erro
        mensagemErro.id = "mensagem-erro"; // Define o ID do elemento
        mensagemErro.className = "mensagem-erro"; // Define a classe CSS do elemento
        document.querySelector("section").appendChild(mensagemErro); // Adiciona o elemento à seção
    }

    // Inicializa uma string vazia para armazenar os resultados da pesquisa
    let resultados = "";

    // Verifica se a pesquisa limpa está vazia
    if (pesquisaLimpa === "") {
        // Se a pesquisa estiver vazia, exibe uma mensagem de erro
        mensagemErro.textContent = "Por favor, digite um nome de jogo ou personagem válido.";
        mensagemErro.style.display = "block"; // Exibe o elemento de mensagem de erro
        setTimeout(() => {
            if (mensagemErro) {
                mensagemErro.remove(); // Remove a mensagem de erro após 2,5 segundos
            }
        }, 2500);
        return; // Encerra a função se a pesquisa estiver vazia
    } else {
        // Se a pesquisa não estiver vazia, oculta a mensagem de erro
        mensagemErro.style.display = "none";
    }

    // Itera sobre cada item na lista de dados
    for (let dado of dados) {
        // Verifica se o título ou os personagens do dado incluem a pesquisa limpa
        if (dado.titulo.toLowerCase().includes(pesquisaLimpa) ||
            dado.personagens.toLowerCase().includes(pesquisaLimpa)) {
            // Adiciona um bloco de HTML para o resultado encontrado
            resultados += `
                <div class="item-resultado">
                    <h2>
                        <a>${dado.titulo}</a>
                    </h2>
                    Sinopse:\n\n
                    <p class="descricao-meta"> ${dado.sinopse}</p>
                    <p class="descricao-meta">${dado.personagens}</p>
                    <a href=${dado.link} target="_blank">Mais informações sobre o jogo</a>
                </div>
            `;
        }
    }

    // Itera sobre cada item na lista de mchars
    for (let _mchar of mchars) {
        // Verifica se o título ou o link do _mchar inclui a pesquisa limpa
        if (_mchar.titulo.toLowerCase().includes(pesquisaLimpa) || 
            _mchar.link.toLowerCase().includes(pesquisaLimpa)) {
            // Adiciona um bloco de HTML para o resultado encontrado
            resultados += `
                <div class="item-resultado">
                    <h2>
                        <a href="#" target="_blank">${_mchar.titulo}</a>
                    </h2>
                    Sinopse:\n
                    <p class="descricao-meta">${_mchar.sinopse}</p>
                    Habilidades:\n\n
                    <p class="descricao-meta">${_mchar.skills}</p>
                    <p class="descricao-meta">${_mchar.resumo}</p>
                    <a href=${_mchar.link} target="_blank">Mais informações sobre</a>
                </div>
            `;
        }
    }
    // Verifica se algum resultado foi encontrado
    if (resultados === "") {
        // Se não houver resultados, exibe uma mensagem informando que nada foi encontrado
        resultados = `<div class="item-resultado">
                        <p class="descricao-meta">Nada foi encontrado, tente novamente.</p>
                      </div>`;
    }

    // Atribui o HTML gerado com os resultados à seção de resultados da pesquisa
    section.innerHTML = resultados;
}
