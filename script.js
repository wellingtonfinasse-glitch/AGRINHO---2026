/**
 * Simulador de Plantio de Soja - Agrinho 2026
 * Desenvolvido por: wellington
 * Tema: Equilíbrio entre Produção e Meio Ambiente
 */

// Variáveis do Estado do Jogo
let dia = 1;
const totalDias = 5;
let agua = 50;
let nutrientes = 60;
let sustentabilidade = 100;
let sacas = 0;

// Elementos da Tela
const txtDia = document.getElementById("dia-atual");
const txtFase = document.getElementById("fase-planta");
const txtSacas = document.getElementById("産量-soja");
const barraAgua = document.getElementById("barra-agua");
const barraNutrientes = document.getElementById("barra-nutrientes");
const barraSustentabilidade = document.getElementById("barra-sustentabilidade");
const campoVisual = document.getElementById("campo-soja");
const divAlerta = document.getElementById("mensagem-alerta");

// Funções de Ação do Usuário
function irrigar() {
    if(dia >= totalDias) return;
    agua = Math.min(agua + 25, 100);
    // Irrigação excessiva gasta água do planeta e diminui levemente a sustentabilidade
    if(agua > 80) {
        sustentabilidade = Math.max(sustentabilidade - 5, 0);
        mostrarAlerta("Cuidado! Água em excesso causa desperdício de recursos híbridos.", "erro");
    } else {
        mostrarAlerta("Irrigação por gotejamento aplicada com sucesso! Economia de água.", "sucesso");
    }
    atualizarInterface();
}

function adubarQuimico() {
    if(dia >= totalDias) return;
    nutrientes = Math.min(nutrientes + 40, 100);
    // Adubo químico aumenta nutrientes rápido, mas destrói a sustentabilidade do solo
    sustentabilidade = Math.max(sustentabilidade - 25, 0);
    mostrarAlerta("Adubo químico aplicado. Os nutrientes subiram, mas agrediu o meio ambiente!", "erro");
    atualizarInterface();
}

function adubarOrganico() {
    if(dia >= totalDias) return;
    nutrientes = Math.min(nutrientes + 15, 100);
    // Adubo orgânico melhora os nutrientes de forma equilibrada e recupera a sustentabilidade
    sustentabilidade = Math.min(sustentabilidade + 10, 100);
    mostrarAlerta("Adubo orgânico e rotação de culturas aplicados. Solo protegido e saudável!", "sucesso");
    atualizarInterface();
}

function proximoDia() {
    if(dia < totalDias) {
        // Consumo diário da planta
        agua = Math.max(agua - 20, 0);
        nutrientes = Math.max(nutrientes - 15, 0);
        
        // Se a planta sofrer por falta de recursos, a sustentabilidade da fazenda cai
        if(agua < 20 || nutrientes < 20) {
            sustentabilidade = Math.max(sustentabilidade - 10, 0);
            mostrarAlerta("A lavoura sofreu neste dia por falta de cuidados adequados!", "erro");
        }

        dia++;
        atualizarFasePlanta();
        atualizarInterface();
    } else {
        calcularResultadoFinal();
    }
}

// Funções de Atualização interna
function atualizarFasePlanta() {
    campoVisual.className = ""; // limpa as classes anteriores
    if(dia === 2) {
        txtFase.innerText = "Brotinho";
        campoVisual.classList.add("fase-brotinho");
    } else if(dia === 3 || dia === 4) {
        txtFase.innerText = "Crescimento Vegetativo";
        campoVisual.classList.add("fase-crescendo");
    } else if(dia === 5) {
        txtFase.innerText = "Pronto para Colheita!";
        campoVisual.classList.add("fase-colheita");
    }
}

function atualizarInterface() {
    txtDia.innerText = `${dia}/${totalDias}`;
    
    // Atualiza o tamanho visual das barras de progresso
    barraAgua.style.width = agua + "%";
    barraNutrientes.style.width = nutrientes + "%";
    barraSustentabilidade.style.width = sustentabilidade + "%";
}

function mostrarAlerta(msg, tipo) {
    divAlerta.innerText = msg;
    divAlerta.className = "alerta " + tipo;
}

function calcularResultadoFinal() {
    // Desabilitar botões
    document.getElementById("btn-irrigar").disabled = true;
    document.getElementById("btn-quimico").disabled = true;
    document.getElementById("btn-organico").disabled = true;
    document.getElementById("btn-proximo").disabled = true;

    // Cálculo da produção baseado no equilíbrio
    if (sustentabilidade > 70 && agua > 30 && nutrientes > 30) {
        sacas = 85; // Alta produtividade real e ecológica
        mostrarAlerta(`🏆 Parabéns! Você atingiu o Equilíbrio Perfeito! Produção: ${sacas} sacas/ha com altíssima sustentabilidade. O Agro Forte protege o futuro!`, "sucesso");
    } else if (sustentabilidade <= 40) {
        sacas = 40; // Esgotou o solo, a produtividade cai a longo prazo
        mostrarAlerta(`⚠️ Colheita Fraca (${sacas} sacas/ha). Você focou na produção rápida, mas esgotou o meio ambiente. O solo ficou infértil.`, "erro");
    } else {
        sacas = 60; // Produção mediana
        mostrarAlerta(`Fim da Simulação! Produção razoável de ${sacas} sacas/ha. Tente equilibrar melhor os recursos biológicos na próxima vez.`, "sucesso");
    }
    txtSacas.innerText = sacas;
}