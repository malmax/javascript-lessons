"use strict";
// Малахов Максим
// Создайте компонент «Часы» (Clock).

// Остальные методы, если нужны, должны быть приватными.
// При нажатии на alert часы должны приостанавливаться, 
// а затем продолжать идти с правильным временем.
Number.prototype.addLeadZero = function() {
    
    var string = String(this);
    if(string.length === 1) {
        string = "0" + string;
    }
    return string;
}

class Clock {   

    constructor(options) {
        // let timer, clockDiv, buttonStart, buttonStop, buttonAlert;
        this.elem = options.elem || document.body;      
        this.init(); //инициализация часов
    }
                
    init() {
        this.clockDiv = document.createElement('h1'); //див для времени
        this.clockDiv.className = "text-center";
        this.elem.appendChild(clockDiv);
        this.drawButtons(); // рисуем кнопки
        this.render(); //выводим время на экран
    }

    tick = () => {                                
        this.render();                
    }

    render() {  
        var date = new Date(); //при каждом создании будет текущее время
        var hours = date.getHours().addLeadZero();
        var minutes = date.getMinutes().addLeadZero();
        var seconds = date.getSeconds().addLeadZero();

        this.clockDiv.innerText = hours + ":" + minutes + ":" + seconds;    
    }

    drawButtons() {
        //рисуем кнопку запустить часы
        this.buttonStart = document.createElement('button');
        this.buttonStart.className = 'btn btn-default';
        this.buttonStart.onclick = start.bind(this);
        this.buttonStart.innerText = 'Запустить часы';
        this.elem.appendChild(this.buttonStart);

        //рисуем кнопку остановить часы
        this.buttonStop = document.createElement('button');
        this.buttonStop.className = 'btn btn-default';
        this.buttonStop.onclick = stop.bind(this);
        this.buttonStop.innerText = 'Остановить часы';
        this.elem.appendChild(this.buttonStop);   

        //рисуем кнопку вывода Алерта
        this.buttonAlert = document.createElement('button');
        this.buttonAlert.className = 'btn btn-default';
        this.buttonAlert.onclick = function() { alert('Закройте Alert и часы пойдут дальше!'); };
        this.buttonAlert.innerText = 'Alert';
        this.elem.appendChild(this.buttonAlert);           
    }

    start() {               
        this.buttonStart.disabled = true;
        this.buttonStop.disabled = false;
        this.timer = setInterval(tick,1000);                 
    }

    stop() {
        this.buttonStart.disabled = false;
        this.buttonStop.disabled = true;
        clearInterval(this.timer); 
    }

   
}

window.addEventListener("load", function(evt) {
    const clock = new Clock({
    elem: document.getElementById('clock')
    });

    clock.stop(); // стоп
    clock.start(); // старт
});
