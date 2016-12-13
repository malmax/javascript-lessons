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

function Clock(options) {   
                
    var that = this;
    var timer, clockDiv, buttonStart, buttonStop, buttonAlert;
    var elem = options.elem || document.body;      
    init(); //инициализация часов

    function init() {
        clockDiv = document.createElement('h1'); //див для времени
        clockDiv.className = "text-center";
        elem.appendChild(clockDiv);
        drawButtons(); // рисуем кнопки
        render(); //выводим время на экран
    }

    function tick() {                                
        render.call(that);                
    }

    function render() {  
        var date = new Date(); //при каждом создании будет текущее время
        var hours = date.getHours().addLeadZero();
        var minutes = date.getMinutes().addLeadZero();
        var seconds = date.getSeconds().addLeadZero();

        clockDiv.innerText = hours + ":" + minutes + ":" + seconds;    
    }

    function drawButtons() {
        //рисуем кнопку запустить часы
        buttonStart = document.createElement('button');
        buttonStart.className = 'btn btn-default';
        buttonStart.onclick = start.bind(this);
        buttonStart.innerText = 'Запустить часы';
        elem.appendChild(buttonStart);

        //рисуем кнопку остановить часы
        buttonStop = document.createElement('button');
        buttonStop.className = 'btn btn-default';
        buttonStop.onclick = stop.bind(this);
        buttonStop.innerText = 'Остановить часы';
        elem.appendChild(buttonStop);   

        //рисуем кнопку вывода Алерта
        buttonAlert = document.createElement('button');
        buttonAlert.className = 'btn btn-default';
        buttonAlert.onclick = function() { alert('Закройте Alert и часы пойдут дальше!'); };
        buttonAlert.innerText = 'Alert';
        elem.appendChild(buttonAlert);           
    }

    function start() {               
        buttonStart.disabled = true;
        buttonStop.disabled = false;
        timer = setInterval(tick,1000);                 
    }

    function stop() {
        buttonStart.disabled = false;
        buttonStop.disabled = true;
        clearInterval(timer); 
    }

    this.start = start;
    this.stop = stop;
}
var clock = new Clock({
    elem: document.getElementById('clock')
});

clock.stop(); // стоп
clock.start(); // старт