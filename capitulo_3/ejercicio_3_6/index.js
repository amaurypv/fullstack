const express = require('express');
const app= express()
const cors = require('cors');

app.use(cors())
app.use(express.json())

let persons=[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons",(req,res)=>{
    res.json(persons)
    console.log(persons)
})

// se va a poner la información de la fecha
app.get('/info',(req,res)=>{
    const fecha= new Date()
    const informacion=
    //se puede tomar la misma estructura que HTML
    `<p>la agenda tiene ${persons.length} contactos</p>
    <p>${fecha}</p>`
    //se envía la información por medio de la variable
    res.send(informacion)
})

//para seleccionar solo un contacto
app.get("/api/persons/:id",(req,res)=>{
  //primero se define el id que se toma del param 
  //MUY IMPORTANTE CONVERTIR EL VALOR A NUMERO
  const idUsuario=Number(req.params.id)
  //se hace un array con los numeros de id de las personas
  const ids=persons.map(n=>n.id)
  //se filtra el usuario con el numero de id obtenido del param
  let usuario=persons.filter(n=>n.id==idUsuario)
  //se hace un if (includes devuelve true si esta o false si no esta)
  if(ids.includes(idUsuario)){
    //si se encuentra se hace un res.json con el usuario filtrado
    res.json(usuario)
    res.status(204).end()  
  }else{
    //si no se encuentra, se envia un res.status(404) y un send con elmensaje deseado
    res.status(400).send('no se encuentra usuario con ese id')
  }
})

//para eliminar una entrada
app.delete("/api/persons/:id",(req,res)=>{
  const idUsuario=Number(req.params.id)
  const ids=persons.map(n=>n.id)
  //se filtra el usuario con el numero de id obtenido del param
  //se hace un if (includes devuelve true si esta o false si no esta)
  if(ids.includes(idUsuario)){
    //se actualiza el array de persons, es importante ver que persons este como let y 
    // no como const ya que si es const, no se cambiará 
    persons=persons.filter(n=>n.id!==idUsuario)
    //importante hacer el end() para que pueda ejecutar el siguiente request
    res.status(204).end()
  }
})

//agregar un nuevo usuario con id random 
app.post('/api/persons',(req,res)=>{
  //el id del nuevo usuario es random entre 1 y 100
  let idBody=req.body.id
  let idRandom=Math.floor(Math.random()*100)
  const ids=persons.map(n=>n.id)
  const nombre=req.body.name
  const numero=req.body.number
  let nombres=persons.map(n=>n.name)
  let numeros=persons.map(n=>n.number)
    if(ids.includes(idBody || idRandom)){
      res.status(400).send(`el id ya se encuetra ocupado ${idBody}`)
    }else if(nombres.includes(nombre)){
      res.status(400).send(`el nombre ya se encuetra ocupado ${nombre}`)
    }else if(!nombre){
      res.status(400).send(`falta poner. nombre`)
    }else if(numeros.includes(numero)){
      res.status(400).send(`el numero ${numero} ya existe`)
    }else{
  let newPerson=
    { 
    "id":idBody||idRandom,
    "name":req.body.name,
    "number":req.body.number
    }
  persons=persons.concat(newPerson)
  res.json(newPerson)
  console.log(newPerson)
   }
})


const port=3001
app.listen(port)
console.log(`escuchando en el puerto ${port}`)

