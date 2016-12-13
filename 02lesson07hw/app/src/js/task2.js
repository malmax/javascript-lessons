"use strict";
// Малахов Максим
// Напишите функцию-конструктор new Voter(options) для голосовалки. Она должна получать элемент в options.elem, в следующей разметке:
// <div id="voter" class="voter">
//   <span class="down">—</span>
//   <span class="vote">0</span>
//   <span class="up">+</span>
// </div>
// 	По клику на + и — число должно увеличиваться или уменьшаться.
// Публичный метод voter.setVote(vote) должен устанавливать текущее число – значение голоса.
// Все остальные методы и свойства пусть будут приватными.
var vote = new Voter({elem: document.getElementById('voter')});

function Voter(options) {
    var elem = options.elem || document.body;
    var that = this;
    var voteNumber = 0;
    var voteElem = elem.querySelector('.vote');
    init();

    function init() {
        //кнопка -
        var downElem = elem.querySelector('.down')
        if(!downElem) { //если не нашли элемент - создаем
            downElem = document.createElement('span');
            downElem.className = 'down btn btn-default';
            downElem.innerText = '-';
            elem.appendChild(downElem);
        }
        //кнопка +
        var upElem = elem.querySelector('.up')
        if(!upElem) { //если не нашли элемент - создаем
            upElem = document.createElement('span');
            upElem.className = 'up btn btn-default';
            upElem.innerText = '+';
            elem.appendChild(upElem);
        }
        //привязываем обработчики
        downElem.onclick = decreaseVote;
        upElem.onclick = increaseVote;      

        //создаем кнопки для setVote
        var div = document.createElement('div');
        div.className = 'setvote';
        for(let i = 1; i <= 5; i++) { //если поставить var то i будет глобальной и that.setVote(i * 10) будет всегда 5 * 10
            var setval =  document.createElement('span'); 
            setval.className = 'btn btn-default';
            setval.innerText = i * 10;
            setval.onclick = function() { that.setVote(i * 10); }
            console.log(setval.onclick);
            div.appendChild(setval);  
        }
        elem.appendChild(div);
                
    }

    function increaseVote() {
        voteNumber++;
        render();
    }

    function decreaseVote() {
        if(voteNumber >= 1)
            voteNumber--;
        render();
    }

    function setVote(vote) {
        // console.log("set " + vote);
        voteNumber = parseInt(vote);
        render();
    }

    function render() {
        voteElem.innerText = voteNumber;
    }

    this.setVote = setVote;
}