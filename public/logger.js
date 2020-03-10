//canvas
var canvas = document.getElementById("grafica");
var dibujo = canvas.getContext("2d");

dibujo.font = "bold 12px sans-serif";

dibujarEjes();

function linea(color, xinicial, yinicial, xfinal, yfinal, lienzo)
{
  lienzo.beginPath();
  lienzo.strokeStyle = color;
  lienzo.moveTo(xinicial, yinicial);
  lienzo.lineTo(xfinal, yfinal);
  lienzo.stroke();
  lienzo.closePath();
}


//Sokcets web
socket = io();
var historicoTemp = [];
var historicoDate = [];
var lectura = 0;
let temp = document.getElementById("temperatura");

socket.on('message:temp', function(data) {
  temp.innerHTML =  `<p><strong>Temperatura Actual:</strong> ${data}°c</p>`;

  var hora = new Date();
  if(lectura < 47)
  {
   historicoTemp[lectura] = parseFloat(data);
   historicoDate[lectura] = hora.getHours() + ":" + hora.getMinutes() + ":" + hora.getSeconds();
   lectura++;
  }
  else
  {
   for(var i = 0; i < 46; i++)
   {
     historicoTemp[i] = historicoTemp[i + 1];
     historicoDate[i] = historicoDate[i + 1];
   }
   historicoTemp[46] = parseFloat(data);
   historicoDate[46] = hora.getHours() + ":" + hora.getMinutes() + ":" + hora.getSeconds();
  }
  graficar();
});


var maxX;
var xInterval;

function dibujarEjes()
{
  var maxValue = -100;
  for(i in historicoTemp)
  {
    if(historicoTemp[i] > maxValue)
    {
      maxValue = historicoTemp[i];
    }
  }

  if(maxValue <= 14)
  {
    maxX = 14;
    xInterval = 2;
  }
  else if(maxValue <= 35)
  {
    maxX = 35;
    xInterval = 5;
  }
  else
  {
    maxX = 70;
    xInterval = 10;
  }

  for(var i = 0; i<10; i++)
  {
    dibujo.fillText( (maxX - i*xInterval) + "°c", 12, 17 + i*50);
    linea("black", 1, 6 + i*50, 10, 6 + i*50, dibujo);
  }

  linea("black", 1, 0, 1, 500, dibujo);
  linea("black", 1, 356, 1000, 356, dibujo);
}

function graficar()
{
  dibujo.clearRect( 0, 0, 1000, 500);
  dibujarEjes();
  var xant = 50;
  var yant = historicoTemp[0];
  var x = 50
  var y = 0;

  var i = 0;
  dibujo.fillText(historicoDate[0], x - 20,  380);
  for( i = 0; i < historicoTemp.length; i++)
  {
    linea("black", 50 + i*20, 351, 50 + i*20, 361, dibujo);

    y = historicoTemp[i];
    linea("red", xant, 356 - yant*50/xInterval, x, 356 - y*50/xInterval, dibujo);
    circulo(x, 356 - y*50/xInterval);
    xant = x;
    x += 20;
    yant = y;

  }
  if(i > 3)
  {
    dibujo.fillText(historicoDate[i - 1], x - 40,  380);
  }


}

function circulo(eX, eY)
{
 dibujo.beginPath();
 dibujo.arc(eX, eY, 3, 0, (Math.PI/180)*360);
 dibujo.fill();
 dibujo.stroke();
 dibujo.closePath();
}
