class CalcController {  //classe é um conjunto de atributos ="variaveis" e métodos ="funções"
    constructor(){
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate; //this._algumaCoisa quer dizer que é privado, this. cria um atributo
        this.initialize();
        this.initButtonsEvents();
    }

    initialize(){ //DOM - Document object module (documento do site), BOM - browse object module (janela do browser)
        this.setDisplayDateTime();
        setInterval(()=>{
            this.setDisplayDateTime();
        }, 500);
    }
    
    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit", 
            month: "short", 
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    clearAll(){
        this._operation = [];
    }

    clearEntry(){
        this._operation.pop()
    }

    setError(){
        this._displayCalcEl = 'ERROR';
    }

    isOperator(value){
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);
    }

    getlastOperation(){
        return this._operation[this._operation.length - 1];
    }

    addOperation(value){
        if(isNaN(this.getlastOperation())) {
            //true = string
            if(this.isOperator(value)){
                //troca de operador
                this._operation[this._operation.length - 1 ] = value;
            }else if(isNaN(value)){
                console.log(value);
            }else {
                this._operation.push(value);
            }
        }else{
            //false = numero
            let newValue = this.getlastOperation().toString() + value.toString();
            this._operation.push(newValue);
        }
        console.log(this._operation);
    }

    execBtn(value){
        switch (value) {
            case 'ac':
                this.clearAll();
                break;

            case 'ce':
                this.clearEntry();
                break;

            case 'soma':
                this.addOperation('+');
                break;

            case 'subtracao':
            this.addOperation('-');
                break;
            
            case 'multiplicacao':
                    this.addOperation('*');
                break;

            case 'divisao':
                    this.addOperation('/');
                break;

            case 'porcento':
                    this.addOperation('%');
                break;

            case 'igual':
                    
                break;

            case 'ponto':
                    this.addOperation(',');
                break;


            case '0':
            case '1':
            case '2':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                    this.addOperation(parseInt(value));
                break;

            default:
                console.log('erro');
            this.setError();
        }
    }

    addEventListenerAll(element, events, fn){
        events.split(' ').forEach(event =>{
            element.addEventListener(event, fn, false);
        });
    }

    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        buttons.forEach((btn, index)=>{
            this.addEventListenerAll(btn, "click drag", e=>{
                let textBtn = btn.className.baseVal.replace('btn-', " ");
                this.execBtn(textBtn);
            });
            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e=>{
                btn.style.cursor = "pointer";
            });
        });
    }

    get displayTime(){
        return this._timeEl.innerHTML;
    }
    set displayTime(value){
        return this._timeEl.innerHTML = value;
    }

    get displayDate(){
        return this._dateEl.innerHTML;
    }
    set displayDate(value){
        return this._dateEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }
    get currentDate(){
        return new Date();
    }
    set currentDate(value){
        this._currentDate = value;
    }
}

