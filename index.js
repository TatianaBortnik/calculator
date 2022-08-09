
const buttons = document.getElementById('buttons');
const expression_field = document.getElementById('expression');
const result_field = document.getElementById('result');

// global variables for Calculator
var expression = '';
var isResult = false;
var result = 0;
var numb = 0;
var expr = [];


function calculateExpression (array) {

    let arr = array;
    let operIndex = 0;

    console.log(arr);

    // do multiplication or division 
    operIndex = arr.findIndex(element => element=='*' || element=='/');
    while (operIndex != -1) {
        if (arr[operIndex] == '*') {
            arr[operIndex-1] = arr[operIndex-1] * arr[operIndex+1];
        } else {
            if (arr[operIndex+1] != 0) {
                arr[operIndex-1] = arr[operIndex-1] / arr[operIndex+1];
            } else {
                return "Division by zero error";
            }
        }
        arr.splice(operIndex,2);
        operIndex = arr.findIndex(element => element=='*' || element=='/');
    }
    // do addition or subtraction
    operIndex = arr.findIndex(element => element=='+' || element=='-');
    while (operIndex != -1) {
        if (arr[operIndex] == '+') {
            arr[operIndex-1] = arr[operIndex-1] + arr[operIndex+1];
        } else {
            arr[operIndex-1] = arr[operIndex-1] - arr[operIndex+1];
        }
        arr.splice(operIndex,2);
        operIndex = arr.findIndex(element => element=='+' || element=='-');
    }
    return arr[0];
}

// event for all buttons of Calculator
buttons.addEventListener('click', (event) => {

    if (event.target.nodeName != 'BUTTON') {
      return;
    }

    let symb = String(event.target.id).substring(1);;  // indicate which button is pressed

    if (isResult && event.target.id != 'bClear') {
        alert('To start new calculation press "Clear"');
    } else {
        switch (symb) {
            case 'Clear' : {
                // Clear button is pressed
                isResult = false;
                result = 0;
                expression = '';
                expr = [];
                numb = 0;
                break;
            }
            case '=' : {
                // calculate expression
                expr.push(numb);
                // call calculation function
                result = calculateExpression(expr);
                isResult = true;
                break;
            }
            default : {
                if (isNaN(symb)) {
                    // non-numeric button is pressed
                    if (expression!='') {
                        if (isNaN(expression.slice(-1))) {
                            // check if second non-numeric symbol is pressed
                            alert('Error! Numeric symbol is expected');
                        } else {
                            expression = expression + symb;
                            expr.push(numb);
                            expr.push(symb);
                            numb = 0;
                        }
                    } 
                    
                } else {
                    // numeric button is pressed
                    expression = expression + symb;
                    numb = numb * 10 + parseInt(symb)
                }
               
            }
        }
        expression_field.value = expression;
        result_field.value = (result != 0) ?  result : '';
    }
    
})

