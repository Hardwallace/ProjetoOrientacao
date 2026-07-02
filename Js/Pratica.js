const outputDiv = document.getElementById("console-output");
const jsInput = document.getElementById('js-input');
const jsHighlight = document.getElementById('js-highlight');

function runJavaScript() {
    const code = jsInput.value.trim();
    
    outputDiv.innerHTML = "";

    if (!code) {
        outputDiv.innerHTML = `<span class="error">Aviso: Digite algum código antes de executar.</span>\n`;
        return;
    }

    const originalLog = console.log;
    
    console.log = function(...args) {
        const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg
        ).join(' ');
        outputDiv.innerHTML += message + "\n";
        originalLog.apply(console, args);
    };

    try {
        eval(code); 
    } catch (error) {
        if (error instanceof SyntaxError) {
            outputDiv.innerHTML += `<span class="error" style="color: #ff5555; font-weight: bold;">
❌ Erro de Sintaxe: O código possui uma estrutura inválida!
Detalhes: ${error.message}</span>\n`;
        } else {
            outputDiv.innerHTML += `<span class="error" style="color: #ffb86c;">⚠️ Erro de Execução: ${error.message}</span>\n`;
        }
    } finally {
        console.log = originalLog;
    }
}

function clearConsole() {
    outputDiv.innerHTML = "";
}

window.onload = runJavaScript;

function updateHighlight() {
    let text = jsInput.value;

    text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    text = text.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="text-green">$&</span>');
    text = text.replace(/\b(let|const|var|log)\b/g, '<span class="keyword-yellow">$1</span>');
    text = text.replace(/\b(alert|console|if|else)\b/g, '<span class="keyword-purple">$1</span>');

    jsHighlight.innerHTML = text + (text.endsWith('\n') ? '\n' : '');
}

jsInput.addEventListener('input', updateHighlight);
jsInput.addEventListener('scroll', () => {
    jsHighlight.scrollTop = jsInput.scrollTop;
    jsHighlight.scrollLeft = jsInput.scrollLeft;
});
