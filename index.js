var sum = 0;
var expression = '';
var isResult = false;
var s1 = 0;



const buttons = document.getElementById('buttons');
const expr = document.getElementById('expression');
const res = document.getElementById('result');

buttons.addEventListener('click', (event) => {

    if (event.target.nodeName != 'BUTTON') {
      return;
    }

    if (isResult && event.target.id!='bClear') {
        alert('To start new calculation press "Clear"');
    } else {
        switch (String(event.target.id)) {
            case 'bClear':
                sum = 0;
                expression = '';
                isResult = false;
                expr.value = expression;
                res.value = '';
                break;
            case 'b=':
                isResult = true;
                sum = sum + s1;
                s1 = 0;
                res.value = sum;
                break;
            case 'b+':
                expression = expression + '+';
                expr.value = expression;
                sum = sum + s1;
                s1 = 0;
              break;
            default:
                let symb = String(event.target.id).substring(1);
                expression = expression + symb;
                expr.value = expression;
                s1 = s1*10 + parseInt(symb);
        }
    
    }
    
});

