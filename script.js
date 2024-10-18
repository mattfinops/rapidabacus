document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');

    let currentValue = '';
    let operator = '';
    let previousValue = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => handleInput(button.textContent));
    });

    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if ((key >= '0' && key <= '9') || key === '.' || 
            ['+', '-', '*', '/'].includes(key) || 
            key === 'Enter' || key === 'Escape') {
            event.preventDefault();
            handleInput(key);
        }
    });

    function handleInput(value) {
        if (value >= '0' && value <= '9' || value === '.') {
            currentValue += value;
            display.value = currentValue;
        } else if (['+', '-', '*', '/'].includes(value)) {
            operator = value;
            previousValue = currentValue;
            currentValue = '';
        } else if (value === '=' || value === 'Enter') {
            if (previousValue && currentValue && operator) {
                currentValue = operate(parseFloat(previousValue), parseFloat(currentValue), operator);
                display.value = currentValue;
                previousValue = '';
                operator = '';
            }
        } else if (value === 'C' || value === 'Escape') {
            clear();
        }
    }

    function operate(a, b, op) {
        switch (op) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return b !== 0 ? a / b : 'Error';
            default:
                return b;
        }
    }

    function clear() {
        currentValue = '';
        operator = '';
        previousValue = '';
        display.value = '';
    }
});