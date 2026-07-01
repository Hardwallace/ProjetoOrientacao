const outputDiv = document.getElementById("console-output");

function runJavaScript() {

    const code = document.getElementById("js-input").value;
            
    outputDiv.innerHTML = "";

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
        outputDiv.innerHTML += `<span class="error">Erro de Execução: ${error.message}</span>\n`;
    }    
        console.log = originalLog;
}

function clearConsole() {
    outputDiv.innerHTML = "";
}

window.onload = runJavaScript;

const jsInput = document.getElementById('js-input');
const jsHighlight = document.getElementById('js-highlight');

function updateHighlight() {
    let text = jsInput.value;

    text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    text = text.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="text-green">$&</span>');

    text = text.replace(/\b(let|const|var)\b/g, '<span class="keyword-yellow">$1</span>');

    text = text.replace(/\b(alert|console|log)\b/g, '<span class="keyword-purple">$1</span>');

    jsHighlight.innerHTML = text + (text.endsWith('\n') ? '\n' : '');
}

jsInput.addEventListener('input', updateHighlight);
jsInput.addEventListener('scroll', () => {
    jsHighlight.scrollTop = jsInput.scrollTop;
    jsHighlight.scrollLeft = jsInput.scrollLeft;
});
