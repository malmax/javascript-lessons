
window.addEventListener("load", function(evt) {

    var canvas = new Canvas({'elem': document.getElementById('canvas'),
                            'strokeStyle': '#f00',
                            'fillStyle': '#ff0',
                            'lineWidth': 4});

    // голова
    canvas.render({'type': 'arc', 'start': [150,150], 'radius': 100, 'angle': [0, 2 * Math.PI], 'fill': false});

    // левый глаз
    canvas.render({'type': 'arc', 'start': [110,110], 'radius':15, 'angle': [0, 2 * Math.PI], 'fill': true});

    // правый глаз
    canvas.render({'type': 'arc', 'start': [190,110], 'radius':15, 'angle': [0, 2 * Math.PI], 'fill': true});

    // рисуем нос
    canvas.render({'type': 'line', 'points': [[150,120],[135,180],[165,180]], 'fill': false});

    // улыбка
    canvas.render({'type': 'arc', 'start': [150,150], 'radius': 70, 'angle': [Math.PI, 2 * Math.PI], 'fill': false});

    //волосы
    canvas.setStrokeStyle('#000');

    var x =0, y = 0;
    for(var i = 0; i<5;i++ ) {
        canvas.render({'type': 'bezier', 'start': [80 + x, 85 + y], 'end': [100 + x, y], 'point1': [60 + x, 60 + y], 'point2': [120 + x, 40 + y], 'fill': false});
        x+=15;
        y-=5;
    }
    for(var i = 0; i<5;i++ ) {
        canvas.render({'type': 'bezier', 'start': [80 + x, 85 + y], 'end': [100 + x, y], 'point1': [x, 60 + y], 'point2': [220 + x, 40 + y], 'fill': false});
        x+=15;
        y+=5;
    }
});

function Canvas(options) {
    var elem = options.elem || document.body.querySelector('canvas');
    var that = this;
    that._context = elem.getContext('2d');           
    init();

    function init() {
        if(!that._context) {
            alert("Скачай нормальный браузер");
        }

        that._context.strokeStyle = options.strokeStyle || '#f00';
        that._context.fillStyle = options.fillStyle || '#ff0';
        that._context.lineWidth = options.lineWidth || 4;
    }
    
    function render(options) {
        that._context.beginPath();

        switch(options.type) {
            case 'arc':
                that._context.arc(options.start[0],options.start[1], options.radius, options.angle[0], options.angle[1], true);                        
            break;

            case 'line':
                options.points.forEach(function(arr, index) {
                    if(!index) // первое значение точек - moveTo
                        that._context.moveTo(arr[0],arr[1]);                            
                    else  // остальные - lineTo
                        that._context.lineTo(arr[0],arr[1]);                            
                });
            break;

            case 'bezier':
                that._context.moveTo(options.start[0],options.start[1]);
                that._context.bezierCurveTo(options.point1[0],options.point1[1],options.point2[0],options.point2[1],options.end[0],options.end[1]);
            break;
        }

        if(options.fill) 
            that._context.fill();                
        else 
            that._context.stroke();        
        
        that._context.closePath();
    }

    
    function setStrokeStyle(value) {
        that._context.strokeStyle = value;
    }
    function setFillStyle(value) {
        that._context.fillStyle = value;
    }
    function setLineWidth(value) {
        that._context.lineWidth = parseInt(value);
    }

    this.render = render;
    this.setStrokeStyle = setStrokeStyle;
    this.setFillStyle = setFillStyle;
    this.setLineWidth = setLineWidth;            
}