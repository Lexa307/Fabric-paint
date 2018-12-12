document.getElementById("canvas_paper").width=window.innerWidth-50;
document.getElementById("canvas_paper").height=window.innerHeight-100;
let canvas = new fabric.Canvas('canvas_paper');
let ObjectsArray=[];
// create a rectangle object
let rect = new fabric.Rect({
  left: 0,
  top: 0,
  fill: 'red',
  width: 20,
  height: 20
});
ObjectsArray.push(rect);
fabric.Image.fromURL('rikardo.png', function(img){

	canvas.add(img);
	ObjectsArray.push(img);
});
function create_circle(){
    let circle = new fabric.Circle({
  radius: 20, fill: 'green', left: 100, top: 100
});
canvas.add(circle);
ObjectsArray.push(circle);
}
function create_csquade(){
    
}
// "add" rectangle onto canvas
canvas.add(rect);
$("#b").click(function(){
	$("#canvas_paper").get(0).toBlob(function(blob){
		saveAs(blob, "myIMG.png");
	});
});

document.getElementById('imgLoader').onchange = function handleImage(e) {
var reader = new FileReader();
  reader.onload = function (event){
    var imgObj = new Image();
    imgObj.src = event.target.result;
    imgObj.onload = function () {
      var image = new fabric.Image(imgObj);
      image.set({
            angle: 0
      });
      ObjectsArray.push(image);
      canvas.centerObject(image);
      canvas.add(image);
      canvas.renderAll();
    }
  }
  reader.readAsDataURL(e.target.files[0]);
}



function tryTodelete(){
    if(canvas.getActiveObject()){
            canvas.remove(canvas.getActiveObject());
        }
}
        

    
    
    
    function KeyboardController(keys, repeat) {
    // Lookup of key codes to timer ID, or null for no repeat
    //
    var timers= {};

    // When key is pressed and we don't already think it's pressed, call the
    // key action callback and set a timer to generate another one after a delay
    //
    document.onkeydown= function(event) {
        var key= (event || window.event).keyCode;
        if (!(key in keys))
            return true;
        if (!(key in timers)) {
            timers[key]= null;
            keys[key]();
            if (repeat!==0)
                timers[key]= setInterval(keys[key], repeat);
        }
        return false;
    };

    // Cancel timeout and mark key as released on keyup
    //
    document.onkeyup= function(event) {
        var key= (event || window.event).keyCode;
        if (key in timers) {
            if (timers[key]!==null)
                clearInterval(timers[key]);
            delete timers[key];
        }
    };

    // When window is unfocused we may not get key events. To prevent this
    // causing a key to 'get stuck down', cancel all held keys
    //
    window.onblur= function() {
        for (key in timers)
            if (timers[key]!==null)
                clearInterval(timers[key]);
        timers= {};
    };
};

KeyboardController({
    46: function() { tryTodelete(); }
}, 200);

function changecolor(pp){
    canvas.getActiveObject().set({fill:pp.value});
    canvas.renderAll();
 
}
