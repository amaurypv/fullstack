3.10 Backend de la Agenda Telefónica, paso 10
Despliega el backend en Internet, por ejemplo en Fly.io o Render.

Prueba el backend desplegado con un navegador y el REST client de VS Code o con Postman para asegurarte de que funcione.

PRO TIP: Cuando despliegues tu aplicación en Internet, vale la pena al menos al principio estar atento a los logs de la aplicación EN TODO MOMENTO.

Crea un README.md en la raíz de tu repositorio y agrega un enlace a tu aplicación en línea.

NOTA: como se mencionó, debes desplegar el BACKEND al servicio en la nube. Si estás utilizando Fly.io, los comandos deben ejecutarse en el directorio raíz del backend (es decir, en el mismo directorio donde se encuentra el package.json del backend). En caso de usar Render, el backend debe estar en la raíz de tu repositorio.

NO deberás desplegar el frontend directamente en ninguna etapa de esta parte. Solo se desplegara el repositorio del backend en todo este proceso, nada más.

SOLUCION: 
como en el ejemplo anterior ya se tiene la carpeta dist que se genero en el frontend
con el npm run build.
ahora se va a hacer un deploy con fly.io
primero en la raiz del backend se hacer 
    fly launch
va a preguntar si se quiere hacer el deploy se pone que N
en el archivo fly.toml, se va a agregar la siguiente linea: 
    [build]

  [env]
  PORT = "3000" # add this


[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0
  processes = ['app']

y en el archivo index en la parte del puerto se a agregar la siguiente linea
    const port = process.env.PORT || 3000;  // Asegúrate de usar process.env.PORT

y se hace el deploy
    fly deploy