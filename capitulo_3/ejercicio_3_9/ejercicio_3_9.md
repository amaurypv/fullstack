
Haz que el backend funcione con el frontend de la agenda telefónica de los ejercicios de la parte anterior. No implementes todavía la funcionalidad para realizar cambios en los números de teléfono, que se implementará en el ejercicio 3.17.

Probablemente tendrás que hacer algunos pequeños cambios en el frontend, al menos en las URL del backend. Recuerda mantener abierta la consola del desarrollador en tu navegador. Si algunas solicitudes HTTP fallan, debes verificar en la pestaña Network qué está sucediendo. Vigila también la consola del backend. Si no hiciste el ejercicio anterior, vale la pena imprimir los datos de la solicitud o request.body en la consola en el controlador de eventos responsable de las solicitudes POST.Configura morgan para que también muestre los datos enviados en las solicitudes HTTP POST:

SOLUCION: 

para hacer el siguiente ejercicio se crearon dos carpetas backend y frontend
en la carpeta backend se copio y se pego el ejercicio 3.8 
en la carpeta frontend se copio y se pego el ejercicio 2.17

por separado si se ejecuta cada una en la raiz de cada carpeta (npm run dev)
funcionan, sin embargo en la urlBase del frontend se tuvo que cambiar la direccion 
por la que tenia el backend 
    http://localhost:3001/api/persons/
y se crear el build  en la misma carpeta del frontend
    npm run build
se copia la carpeta que se crea al hacer el build (dist) y se pega en la raiz del backend

en el backend se tiene que agregar el middleware 
    app.use(express.static('dist'))
