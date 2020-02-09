const path = require('path');
const express = require("express");
const app = express();
var SerialPort = require("serialport");

//setings
app.set('port', process.env.PORT || 3000);

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Start ther server
const server = app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});

//Web sockets
const SocketIO = require('socket.io');
const io = SocketIO(server);

//Manejo de archivos
const fs = require('fs');

//Serial PORT
const Delimiter = require('@serialport/parser-delimiter')
const port = new SerialPort('COM6')

const parser = port.pipe(new Delimiter({ delimiter: '\n' }))
parser.on('data', function(data){
  console.log(data.toString());
  io.sockets.emit('message:temp', data.toString());

  var date = new Date();

  var dateData = {
    dia: date.getDate(),
    mes: date.getMonth() + 1,
    anio: date.getFullYear(),
    hora: date.getHours(),
    minuto: date.getMinutes(),
    segundo: date.getSeconds()
  }

  for(i in dateData)
  {
    if(dateData[i] < 10)
    {
      dateData[i] = "0" + dateData[i];
    }
  }

  var fileName = "log_" + dateData.dia + dateData.mes + dateData.anio;
  fs.appendFile('logs/' + fileName + '.txt', dateData.dia + "/" + dateData.mes + "/" + dateData.anio + ", " + dateData.hora + ":" + dateData.minuto + ":" + dateData.segundo + ", " + data.toString() + "\n", error => {
  if (error)
    console.log(error);
  else
    console.log('Guardado Correctamente');
  });
}); // emits data after every '\n'
