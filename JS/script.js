// Variáveis globais
let currentProbability = 0;
let currentRiskLevel = '';

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    setupFAQ();
    initializeApp();
});

function initializeApp() {
    resetAnalysis();
}

// Configurar FAQ interativo
function setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Fecha todos os outros
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-question').classList.remove('active');
            });
            
            // Abre/fecha o atual
            if (!isActive) {
                faqItem.classList.add('active');
                this.classList.add('active');
            }
        });
    });
}

// Simular análise do modelo de machine learning
function simulateAnalysis() {
    // Em produção, isso viria da API do modelo
    // Aqui simulamos diferentes cenários
    const scenarios = [
        {
            probability: 85,
            description: "Paciente apresenta múltiplos fatores de risco significativos. Recomenda-se intervenção imediata e monitoramento intensivo.",
            factors: [
                { name: "Idade > 70 anos", impact: "alto", description: "Idade avançada é um fator de risco significativo" },
                { name: "Fadiga > 7", impact: "alto", description: "Nível elevado de fadiga indica comprometimento" },
                { name: "Pressão Arterial", impact: "alto", description: "PA 180/110 mmHg - Hipertensão grave" },
                { name: "Histórico Cardíaco", impact: "moderado", description: "Antecedentes de doença cardiovascular" }
            ]
        },
        {
            probability: 62,
            description: "Paciente apresenta alguns fatores de risco moderados. Recomenda-se acompanhamento regular e possíveis ajustes no tratamento.",
            factors: [
                { name: "Idade entre 50-70", impact: "moderado", description: "Faixa etária requer atenção" },
                { name: "Fadiga moderada (5-7)", impact: "moderado", description: "Sintoma presente mas não crítico" },
                { name: "IMC Elevado", impact: "moderado", description: "IMC 28 - Sobrepeso" },
                { name: "Sedentarismo", impact: "neutro", description: "Baixa atividade física relatada" }
            ]
        },
        {
            probability: 35,
            description: "Paciente apresenta baixo risco com fatores protetores predominantes. Manter acompanhamento de rotina.",
            factors: [
                { name: "Idade < 50 anos", impact: "neutro", description: "Faixa etária favorável" },
                { name: "Atividade Física", impact: "neutro", description: "Paciente relata exercícios regulares" },
                { name: "Sem Comorbidades", impact: "neutro", description: "Não há doenças crônicas identificadas" },
                { name: "Exames Normais", impact: "neutro", description: "Resultados dentro dos parâmetros" }
            ]
        }
    ];
    
    // Seleciona cenário aleatório para demonstração
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    
    updateDisplay(scenario.probability, scenario.description, scenario.factors);
}

// Atualizar display com os resultados
function updateDisplay(probability, description, factors) {
    currentProbability = probability;
    
    // Determinar nível de risco baseado na probabilidade
    let riskLevel, riskClass;
    if (probability >= 80) {
        riskLevel = 'Alto Risco';
        riskClass = 'alto';
    } else if (probability >= 50 && probability < 80) {
        riskLevel = 'Risco Moderado';
        riskClass = 'moderado';
    } else {
        riskLevel = 'Seguro';
        riskClass = 'seguro';
    }
    
    currentRiskLevel = riskClass;
    
    // Animar valor da probabilidade
    animateValue('probabilityValue', 0, probability, 1500);
    
    // Atualizar barra de progresso circular
    updateProgressBar(probability);
    
    // Atualizar nível de risco
    const riskElement = document.getElementById('riskLevel');
    riskElement.textContent = riskLevel;
    riskElement.className = 'risk-level ' + riskClass;
    
    // Atualizar descrição
    document.getElementById('resultDescription').textContent = description;
    
    // Atualizar cards de fatores
    updateFactorCards(factors);
}

// Animar contagem numérica
function animateValue(elementId, start, end, duration) {
    const element = document.getElementById(elementId);
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, 16);
}

// Atualizar barra de progresso circular
function updateProgressBar(probability) {
    const progressBar = document.getElementById('progressBar');
    const circumference = 2 * Math.PI * 54; // 2πr onde r=54
    const offset = circumference - (probability / 100) * circumference;
    
    progressBar.style.strokeDashoffset = offset;
    
    // Mudar cor baseada no risco
    if (probability >= 80) {
        progressBar.style.stroke = '#ef4444'; // Vermelho
    } else if (probability >= 50) {
        progressBar.style.stroke = '#f59e0b'; // Amarelo
    } else {
        progressBar.style.stroke = '#10b981'; // Verde
    }
}

// Atualizar cards de fatores
function updateFactorCards(factors) {
    const container = document.getElementById('explanationCards');
    container.innerHTML = '';
    
    factors.forEach(factor => {
        const card = document.createElement('div');
        card.className = `factor-card ${factor.impact}`;
        card.innerHTML = `
            <h4>${factor.name}</h4>
            <p>${factor.description}</p>
        `;
        container.appendChild(card);
    });
}

// Resetar análise
function resetAnalysis() {
    currentProbability = 0;
    currentRiskLevel = '';
    
    document.getElementById('probabilityValue').textContent = '0';
    document.getElementById('progressBar').style.strokeDashoffset = 339.292;
    document.getElementById('progressBar').style.stroke = '#2563eb';
    document.getElementById('riskLevel').textContent = 'Aguardando análise';
    document.getElementById('riskLevel').className = 'risk-level';
    document.getElementById('resultDescription').textContent = 'Insira os dados do paciente para realizar a análise de risco.';
    document.getElementById('explanationCards').innerHTML = `
        <div class="info-placeholder">
            <p>Os fatores de risco serão exibidos aqui após a análise.</p>
        </div>
    `;
}

// Exportar relatório
function exportResult() {
    if (currentProbability === 0) {
        alert('Realize uma análise primeiro antes de exportar o relatório.');
        return;
    }
    
    const report = generateReport();
    downloadReport(report);
}

// Gerar relatório em texto
function generateReport() {
    const date = new Date().toLocaleString('pt-BR');
    const riskText = document.getElementById('riskLevel').textContent;
    const description = document.getElementById('resultDescription').textContent;
    
    let report = `RELATÓRIO DE ANÁLISE DE RISCO CLÍNICO\n`;
    report += `========================================\n\n`;
    report += `Data: ${date}\n`;
    report += `Probabilidade: ${currentProbability}%\n`;
    report += `Classificação: ${riskText}\n\n`;
    report += `Descrição:\n${description}\n\n`;
    report += `Fatores Analisados:\n`;
    
    const factorCards = document.querySelectorAll('.factor-card');
    factorCards.forEach((card, index) => {
        const title = card.querySelector('h4').textContent;
        const desc = card.querySelector('p').textContent;
        report += `${index + 1}. ${title}: ${desc}\n`;
    });
    
    report += `\n========================================\n`;
    report += `Este relatório é gerado automaticamente pelo sistema.\n`;
    report += `Uso exclusivo para profissionais de saúde.\n`;
    
    return report;
}

// Download do relatório
function downloadReport(content) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `relatorio_risco_${new Date().getTime()}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
}

// Função para receber dados da API do modelo (para integração futura)
async function receiveModelResponse(apiResponse) {
    try {
        // Espera-se que apiResponse tenha: probability, description, factors
        const { probability, description, factors } = apiResponse;
        
        if (probability === undefined) {
            throw new Error('Probabilidade não fornecida');
        }
        
        updateDisplay(probability, description || '', factors || []);
    } catch (error) {
        console.error('Erro ao processar resposta do modelo:', error);
        alert('Erro ao processar dados do modelo. Verifique o formato dos dados.');
    }
}

// Expor função globalmente para uso externo
window.receiveModelResponse = receiveModelResponse;
