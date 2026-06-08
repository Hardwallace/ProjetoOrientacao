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