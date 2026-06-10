const tela = document.getElementById('tela-jogo');
const fazendeiro = document.getElementById('fazendeiro');
const txtPontos = document.getElementById('pontos');

let pontos = 0;
let posicaoFazendeiro = 180;
let jogoAtivo = true;

// Itens bão pro meio ambiente e os ruim que atrapalha a colheita
const itensBons = ['💧', '🌱', '☀️'];
const itensRuins = ['🔥', '🚫'];

// Movimentação do fazendeiro no teclado
document.addEventListener('keydown', (e) => {
    if (!jogoAtivo) return;

    if (e.key === 'ArrowLeft' && posicaoFazendeiro > 0) {
        posicaoFazendeiro -= 20;
    } else if (e.key === 'ArrowRight' && posicaoFazendeiro < 360) {
        posicaoFazendeiro += 20;
    }
    fazendeiro.style.left = posicaoFazendeiro + 'px';
});

// Função para criar as coisas caindo do céu
function criarItem() {
    if (!jogoAtivo) return;

    const item = document.createElement('div');
    item.classList.add('item');

    // Sorteia se o item é sustentável ou prejudicial
    const ehBom = Math.random() > 0.4;
    const lista = ehBom ? itensBons : itensRuins;
    item.innerText = lista[Math.floor(Math.random() * lista.length)];

    // Posição x aleatória dentro da tela
    item.style.left = Math.floor(Math.random() * 370) + 'px';
    item.style.top = '0px';
    tela.appendChild(item);

    let posicaoY = 0;

    // Faz o item descer
    const queda = setInterval(() => {
        if (!jogoAtivo) {
            clearInterval(queda);
            item.remove();
            return;
        }

        posicaoY += 5;
        item.style.top = posicaoY + 'px';

        // Checa colisão com o fazendeiro
        if (posicaoY >= 450 && posicaoY <= 480) {
            let itemX = parseInt(item.style.left);
            if (itemX >= posicaoFazendeiro - 20 && itemX <= posicaoFazendeiro + 30) {
                clearInterval(queda);
                item.remove();

                if (ehBom) {
                    pontos += 10;
                    txtPontos.innerText = pontos;
                } else {
                    fimDeJogo();
                }
            }
        }

        // Se sumir por baixo da tela
        if (posicaoY > 500) {
            clearInterval(queda);
            item.remove();
        }
    }, 30);
}

// Loop para gerar novos itens na lavoura
const geradorItens = setInterval(criarItem, 1200);

function fimDeJogo() {
    jogoAtivo = false;
    alert(`Eita, cansanção! Pegou o que não devia na lavoura. Fim de jogo! Cê feiz ${pontos} pontos.`);
}

function reiniciarJogo() {
    location.reload();
}