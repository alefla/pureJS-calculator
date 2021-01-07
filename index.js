//val() is vulnarable from attacker/hacker, don't use it for arithmatic

window.addEventListener('DOMContentLoaded', calculator);
const keys = ['*', '/', '-', '+', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0', '.'];
const spec = ['*', '/', '-', '+'];

function calculator() {
    document.title = 'Calculator';//tab title/in head
    //style the body
    document.body.style.textAlign = 'center';
    document.body.style.backgroundColor = 'skyblue';

    //create div class="container"
    const container = document.createElement('div');
    container.style.maxWidth = '600px';
    container.style.margin = '0 auto';
    document.body.appendChild(container);

    //create header
    const header = document.createElement('h1');
    const t = document.createTextNode("Calculator");
    header.appendChild(t);
    container.appendChild(header);

    //create input
    const output = document.createElement('input');
    output.style.lineHeight = '50px';
    output.style.width = '100%';
    output.style.fontSize = '2rem';
    output.style.textAlign = 'right'
    output.style.border = '2px solid black'
    output.style.boxSizing = 'border-box';
    container.appendChild(output);

    //create div class="keysContainer"
    const keysContainer = document.createElement('div');
    keysContainer.style.width = '100%';
    keysContainer.style.backgroundColor = 'grey';
    container.appendChild(keysContainer);

    //making a btn fisrt, then wrap with function btnMaker
    function btnMaker(txt, myFunction) {
        let btn = document.createElement('button');
        btn.setAttribute('type', 'text');
        btn.style.width = '23%';
        btn.style.margin = '1%';
        btn.style.lineHeight = '50px';
        btn.val = txt; //val is not keyword, can be anyname
        btn.textContent = txt;
        btn.style.fontSize = "2rem";
        btn.addEventListener('click', myFunction);
        keysContainer.appendChild(btn);
    }
    //run each of keys btn.val and create btn for each val(printed on btn and has that val) plus add a function to output in input box
    keys.forEach(function (val) {
        //console.log(val);
        btnMaker(val, addOutput);
    });

    function borderNormal() {
        output.style.border = '2px solid black';
        output.style.boxShadow = 'none';
    }

    function borderErr() {
        output.style.border = '2px solid red';
        output.style.boxShadow = " inset 0 0 10px red"
    }

    // =======most logic below:========
    //add output on keys
    let pressed = false;//any keys will be false after pressed
    let isSpec = false;
    function addOutput(e) {
        //console.log(e.target.val);check val on click
        let char = e.target.val;
        borderNormal();
        //console.log(pressed);
        //turn off decimal after used once
        if (char == ".") { //if the key pressed has value ".", process nested if
            if (pressed) { // if pressed before give char value ""
                char = "";
                borderErr();
            } else {//if no pressed before, we don't set char ="" so it will output ".", but we set true to stop user type more "."
                pressed = true;
            }
        }
        //turn on again if folow bty special char
        isSpec = spec.includes(char);
        if (isSpec) {
            pressed = false;
        }
        output.value += char;
    };
    
    //create = c backspace btn
    btnMaker('=', evalOutput);
    btnMaker('C', clrOutput);
    btnMaker('back', backSpace);

    //evaluation : eval() is js function to calculate
    function evalOutput() {
        //console.log('=');
        if (output.value === "") {
            borderErr();
        } else if (isSpec) { //if last one is spec
            borderErr();
        } else {
            output.value = eval(output.value).toFixed(2);
        }
        pressed = output.value.includes(".");//set decimal value back to ".", instead of bolean after eval
    }

    //clear input
    function clrOutput() {
        //console.log('C');
        output.value = '';
        borderNormal();
        pressed = false; //to clear if last pressed is true
    }

    //backspace
    function backSpace() {
       // console.log('back');
        borderNormal();
        output.value = output.value.slice(0, - 1);
        pressed = false;
    }
    const note = document.createElement('p');
    const tnote = document.createTextNode("Pure JavaScript Calculator (used DOM html/css) - CeloneS Dec/2021");
    note.appendChild(tnote);
    note.style.textAlign = "center";
    document.body.appendChild(note);
}    
