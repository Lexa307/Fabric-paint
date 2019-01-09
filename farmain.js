
document.getElementById("canvas_paper").width=window.innerWidth-300;
document.getElementById("canvas_paper").height=window.innerHeight-100;
let canvas = new fabric.Canvas('canvas_paper');
let ObjectsArray=[];
// create a rectangle object



// "add" rectangle onto canvas

$("#b").click(function(){
    //let path = document.getElementById("b").files[0].path;
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
    46: function() { tryTodelete()},
   // 32: function(){ canvas.isDrawingMode=!canvas.isDrawingMode; }
}, 200);

function changecolor(pp){
    canvas.getActiveObject().set({fill:pp.value});
    canvas.renderAll();
 
}




// console.clear();
// function $(selector) { return document.querySelector(selector); }        
/* Basic example */

let parentBasic = document.getElementById("colortype");
let  piker = new Picker(document.querySelector('#colortype'));
piker.color="#000000ff";
piker.onChange = function(color) {
    
    // let nc= new fabric.Color();
    if(canvas.getActiveObject()){
        canvas.getActiveObject().set({fill:color.rgbaString});
        canvas.renderAll();
    }
    
};
//piker.openHandler();
//Open the popup manually:



$(document).ready( function() {
    $(".item input[type=file]").change(function(){
         var filename = $(this).val().replace(/.*\\/, "");
         $("#imgLoader").val(filename);
    });
});

function brushmode(){
    canvas.isDrawingMode=!canvas.isDrawingMode;
    if(canvas.isDrawingMode){
        if(document.getElementById("paramdiv")){
             jQuery('#paramdiv').detach();
             document.getElementById('prim').style.backgroundColor= "#337ab7";
             document.getElementById("prim").id2=false;
             document.getElementById('textbutt').style.backgroundColor= "#337ab7";
             document.getElementById("textbutt").id2=false;
        }
        document.getElementById('brush').style.backgroundColor= "#000";
        let paramdiv = document.createElement('div');
        paramdiv.style.top="5%";
        paramdiv.style.left="89%";
        paramdiv.style.position="absolute";
        paramdiv.id="paramdiv";
        
        let textElem = document.createElement('div');
        textElem.innerHTML="Размер кисти";
    
        paramdiv.appendChild(textElem);
        let min = document.createTextNode('1');
        paramdiv.appendChild(min);
        let sizeflag = document.createElement("input");
        sizeflag.type="range";
        sizeflag.min=1;
        sizeflag.max=50;
        sizeflag.value=1;
        sizeflag.onchange = ()=>{
            canvas.freeDrawingBrush.width=sizeflag.value;
        }
        paramdiv.appendChild(sizeflag);
        
        let max = document.createTextNode('50');
        paramdiv.appendChild(max);
        paramdiv.appendChild(document.createElement('br'));
        let brushcolor = document.createElement('input');
        brushcolor.type='color';
        brushcolor.onchange = ()=>{
            canvas.freeDrawingBrush.color=brushcolor.value;
        }
        paramdiv.appendChild(document.createTextNode('Цвет кисти'));
        paramdiv.appendChild(document.createElement('br'));
        paramdiv.appendChild(brushcolor);
        document.body.appendChild(paramdiv);
        
    }else{
         if(document.getElementById("paramdiv")){
             jQuery('#paramdiv').detach();
             document.getElementById('prim').style.backgroundColor= "#337ab7";
             document.getElementById("prim").id2=false;
             document.getElementById('textbutt').style.backgroundColor= "#337ab7";
             document.getElementById("textbutt").id2=false;
        }
         document.getElementById('brush').style.backgroundColor= "#337ab7";
    }
    
}

document.getElementById("textbutt").id2=false;
document.getElementById("prim").id2=false;
function textParam(){
    if(!document.getElementById("textbutt").id2){
        document.getElementById("textbutt").id2=true;
        document.getElementById('textbutt').style.backgroundColor= "#000";
        if(document.getElementById("paramdiv")){
             jQuery('#paramdiv').detach();
             document.getElementById('prim').style.backgroundColor= "#337ab7";
             document.getElementById('brush').style.backgroundColor= "#337ab7";
             canvas.isDrawingMode=false;
             document.getElementById("prim").id2=false;
        }
        let paramdiv = document.createElement('div');
         paramdiv.style.top="5%";
        paramdiv.style.left="89%";
        paramdiv.style.position="absolute";
        paramdiv.id="paramdiv";
        
   
        let textElem = document.createElement('div');
        textElem.innerHTML="Размер шрифта";
    
        paramdiv.appendChild(textElem);
        let min = document.createTextNode('1');
        paramdiv.appendChild(min);
        let sizeflag = document.createElement("input");
        sizeflag.type="range";
        sizeflag.min=1;
        sizeflag.max=40;
    
        paramdiv.appendChild(sizeflag);
        let max = document.createTextNode('40');
        paramdiv.appendChild(max);
        paramdiv.appendChild(document.createElement('br'));
        let textdesc = document.createTextNode('текст');
        paramdiv.appendChild(textdesc);
        let field = document.createElement('input');
        field.type="text";
        paramdiv.appendChild(field);
        let bold,italic,normal;
    
        bold=document.createElement('input');
        italic=document.createElement('input');
        normal=document.createElement('input');
        bold.value="bold"
        normal.value="normal"
        bold.type=normal.type="radio";
        italic.type="checkbox"
        bold.id="d1";italic.id="d2";normal.id="d3";
        bold.name=normal.name="style";
        italic.name="texttype";
        paramdiv.appendChild(document.createElement('br'));
        paramdiv.appendChild(document.createTextNode('bold  '));
        paramdiv.appendChild(bold);
   
        paramdiv.appendChild(document.createElement('br'));
        paramdiv.appendChild(document.createTextNode('normal  '));
        paramdiv.appendChild(normal);
        normal.checked=true;
        paramdiv.appendChild(document.createElement('br'));
    
    
        paramdiv.appendChild(document.createTextNode('italic  '));
        paramdiv.appendChild(italic);
        paramdiv.appendChild(document.createElement('br'));
    
      
        let confirn = document.createElement('input');
        confirn.type="button";
        confirn.value="Вставить текст";
    
    
        paramdiv.appendChild(confirn);
        confirn.addEventListener("click",()=>{
        if(field.value){
            let inputtext = new fabric.Text(field.value, {
            fontSize: sizeflag.value,
            fontWeight:document.querySelector('input[name="style"]:checked').value
            });
            if(document.querySelector('input[name="texttype"]:checked')){
                inputtext.fontStyle= 'italic';
            }
            canvas.add(inputtext);
            let params= jQuery('#paramdiv');
            params.detach();
            document.getElementById("textbutt").id2=false;
            document.getElementById('textbutt').style.backgroundColor= "#337ab7";
             
        }
     
        }, false);
    
        document.body.appendChild(paramdiv);
        
    }
    
}

function addOption (oListbox, text, value, isDefaultSelected, isSelected)
{
  let oOption = document.createElement("option");
  oOption.appendChild(document.createTextNode(text));
  oOption.setAttribute("value", value);

  if (isDefaultSelected) oOption.defaultSelected = true;
  else if (isSelected) oOption.selected = true;

  oListbox.appendChild(oOption);
}

function geomparam(){
    if(!document.getElementById("prim").id2){
        document.getElementById("prim").id2=true;
        document.getElementById('brush').style.backgroundColor= "#337ab7";
        document.getElementById('prim').style.backgroundColor= "#000";
        if(document.getElementById("paramdiv")){
             jQuery('#paramdiv').detach();
             document.getElementById('textbutt').style.backgroundColor= "#337ab7";
             document.getElementById("textbutt").id2=false;
             canvas.isDrawingMode=false;
        }
        let geomparams = document.createElement('div');
        geomparams.style.top="5%";
        geomparams.style.left="89%";
        geomparams.style.position="absolute";
        geomparams.id="paramdiv";
    
        let geom = document.createElement('select');
    
        addOption(geom, "Прямоугольник", "Rect", true);
        addOption(geom, "Круг", "Circle", false);
        addOption(geom, "Треугольник", "Triangle", false);
    
        geomparams.appendChild(geom);
        document.body.appendChild(geomparams);
        let confirnbutton = document.createElement('input');
        confirnbutton.type="button";
        confirnbutton.value="Создать фигуру";
        geomparams.appendChild(document.createElement('br'));
        geomparams.appendChild(confirnbutton);
        confirnbutton.addEventListener("click",()=>{
            let selector;
            for(let i=0; i<geom.options.length;i++){
                if(geom.options[i].selected==true){
                    selector=geom.options[i].value;
                }
            }
            switch (selector) {
                case 'Rect':
                    let rect = new fabric.Rect({
                        left: 20,
                        top: 20,
                        fill:piker.color,
                        width: 20,
                        height: 20
                    });
                    canvas.add(rect);
                    break;
                case 'Triangle':
                    let triangle = new fabric.Triangle({
                        width: 20,
                        height: 30,
                        fill:piker.color,
                        left: 20,
                        top: 20
                    });
                    canvas.add(triangle);
                    break;
                case 'Circle':
                    let circle = new fabric.Circle({
                        radius: 20,
                        left: 20,
                        fill:piker.color,
                        top: 20
                    });
                    canvas.add(circle);
                    break;
            }
            document.getElementById("prim").id2=false;
            document.getElementById('prim').style.backgroundColor= "#337ab7";
            let params= jQuery('#paramdiv');
            params.detach();
        },false);
        geomparams.appendChild(confirnbutton);
        }
        
}
