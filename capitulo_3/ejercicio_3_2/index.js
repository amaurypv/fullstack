const express = require('express');
const app= express()
const cors = require('cors');
const { json } = require('express');
app.use(cors())
app.use(express.json())

const persons=[
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

const port=3001
app.listen(port)
console.log(`escuchando en el puerto ${port}`)

