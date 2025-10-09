let display = document.getElementById('display');
let currentInput = '';
let shouldResetDisplay = false; 

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
        display.textContent = ''; 
    }

    if (currentInput === '0' && number === '0') return;
    
    if (currentInput === '0' && number !== '0' && number !== '.') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    
    display.textContent = currentInput;
}

function appendOperator(operator) {
    if (currentInput === '' && display.textContent === '0' && operator !== '.' && operator !== '-') {
        return;
    }
    
    if (currentInput === '' && operator !== '.' && operator !== '-') {
        return;
    }

    if (operator === '.') {
        const operators = ['+', '-', '/', 'x', '%'];
        const lastOperatorIndex = Math.max(...operators.map(op => currentInput.lastIndexOf(op)));
        const currentNumber = lastOperatorIndex === -1 
            ? currentInput 
            : currentInput.substring(lastOperatorIndex + 1);

        if (currentNumber.includes('.')) {
            return;
        }

        if (currentInput === '' || operators.includes(currentInput.slice(-1))) {
            currentInput += '0.';
        } else {
            currentInput += operator;
        }
        display.textContent = currentInput;
        return;
    }
    
    const lastChar = currentInput.slice(-1);
    const operators = ['+', '-', '/', 'x', '%'];
    if (operators.includes(lastChar) && operators.includes(operator) && operator !== '-') {
        currentInput = currentInput.slice(0, -1) + operator;
        display.textContent = currentInput;
        return;
    }
    
    if (lastChar === '-' && operator === '-') return; 
    if (operators.includes(lastChar) && operator === '-') {
        currentInput += operator;
        display.textContent = currentInput;
        return;
    }

    if (shouldResetDisplay) {
        shouldResetDisplay = false;
    }

    currentInput += operator;
    display.textContent = currentInput;
}

function calculate() {
    let expression = currentInput.replace(/x/g, '*');
    expression = expression.replace(/(\d+\.?\d*)%/g, '($1/100)');

    try {
        let result = eval(expression);

        if (result === undefined || isNaN(result) || result === Infinity || result === -Infinity) {
            throw new Error('Cálculo inválido');
        }

        currentInput = result.toString();

        let displayResult = result;
        if (!Number.isInteger(result)) {
            displayResult = parseFloat(result.toFixed(8));
        }
        
        display.textContent = displayResult;
        shouldResetDisplay = true;

    } catch (e) {
        display.textContent = 'Erro';
        currentInput = '';
        shouldResetDisplay = true;
    }
}

function clearDisplay() {
    currentInput = '';
    display.textContent = '0';
    shouldResetDisplay = false;
}

window.onload = function() {
    display.textContent = '0';
};