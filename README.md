# TempLogger
El proyecto consiste en un logger de temperatura, montando un servidor web local. Básicamente se grafica todos los valores flotantes que sean recibidos a través del puerto serie y se crea un archivo separado con comas de los valores, fecha y hora por día. Está diseñado con fines demostratibos y podría servir para un proyecto de casa o académico.

## ¿Cómo utilizarlo?
Antes de ejecutar deberás asegurarte de que en la linea 40 del archivo "index.js" este el puerto COM correcto ya que esto cambiará en cada PC, conecta tu convertidor FTID a un puerto USB y revisa que puero COM es asignado, luego cámbialo en la linea antes mensionada.

Una vez hecho esto en la carpeta PCB se encuentran los archivos de fabricación de las tarjetas y podrás encontrar una descripción en https://tecnoingenia.com , la idea es que funcione por medio de radio frecuencia pero no es necesario, bastará con conectar tu arduino a la PC con el sensor que gustes y enviar el valor por puerto serie con la frecuencia que decees que se grafiquen los datos.

[![logger](https://tecnoingenia.com/wp-content/uploads/2020/03/portada.png "logger")](https://tecnoingenia.com/wp-content/uploads/2020/03/portada.png "logger")
