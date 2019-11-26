class CalcController { //classe é um conjunto de atributos ="variaveis" e métodos ="funções", funções com _ quer dizer que é "privada"
 
    constructor(){
        this._operation=[];
        this._locale='pt-br';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data"); // pego do documento HTML
        this._timeEl = document.querySelector("#hora");                    
        this._currentDate; //this._algumaCoisa quer dizer que é privado, this. cria um atributo
        this.initialize();
        this.initButtonsEvents();
    }
    initialize(){ //DOM - Document object module (documento do site), BOM - browse object module (janela do browser)
        this.setDisplayDateTime();
        setInterval(() => {
            this.setDisplayDateTime();
        }, 500);
    }

    setDisplayDateTime(){
        this.setDisplayDate = this.getCurrentDate.toLocaleDateString(this._locale,{
            day :"2-digit",
            month :"short",
            year:"numeric"
        });
        this.setDisplayTime= this.getCurrentDate.toLocaleTimeString(this._locale);
    }
 
    
    clearAll(){
        this._operation=[];
    }
 
    clearEntry(){
        this._operation.pop(); //elimina o ultimo valor do array
    }
 
    setErro(){
        this._displayCalcEl = 'ERROR!';
    }

    setLastOperation(value){
        return this._operation[this._operation.length-1] = value;
    }
 
    isOperator(value){
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);
    }
 
    getLastOperation(){
        return this._operation[this._operation.length-1];
    }
 
    addOperation(value){
        console.log("a", this.getLastOperation());
        if(isNaN(this.getLastOperation())){
            if(this.isOperator(value)){
                this.setLastOperation(value);
            } else if(isNaN(value)) {  
                console.log(value);
            } else {
                this._operation.push(value);
                console.log(value);
            }
        } else {
            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(parseInt(newValue));
        }
        console.log(this._operation);
    }

    execBtn(value){
        
        switch(value){
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
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                
                break;
            case 'ponto':
                    this.addOperation('.');
                break;    
                        
                
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
           
                default:
                    this.setError();
                    break;
                        
        }
        
    }
 
    addEventListenerAll(elements, events, fn){
        events.split(' ').forEach(event =>{
            elements.addEventListener(event, fn, false);
        });
    }
 
    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g , #parts > g");
        buttons.forEach((btn,index)=>{
            this.addEventListenerAll(btn,'click drag ', ()=>{
            let textBtn = btn.className.baseVal.replace("btn-","");
            this.execBtn(textBtn);
        });
        this.addEventListenerAll(btn,'mouseover mouseup mousedown', ()=>{
            btn.style.cursor = "pointer";
        });
        });
    }
 
    
    get getDisplayDate(){
        return this._dateEl.innerHTML;
    }

    set setDisplayDate(value){
         this._dateEl.innerHTML=value;
    }
 
    get getDisplayTime (){
        return this._timeEl.innerHTML;
    }
    set setDisplayTime (value){
         this._timeEl.innerHTML = value;
    }
 
    get getDisplayCalc(){
        return this._displayCalcEl.innerHTML;
    }
 
    set setDisplayCalc(value){
        this._displayCalcEl.innerHTML=value;
    }
 
    get getCurrentDate(){
        return new Date();
    }
 
    set setCurrentDate(value){
        this._dataAtual=value;
    }
}