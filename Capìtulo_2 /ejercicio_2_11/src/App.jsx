import { useState,useEffect } from 'react'
import Lista from './components/lista'
import axios from 'axios'

function App() {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('Agrega un nombre')
  const [telefono,SetTelefono]=useState('Numero de telefono')
  
  const [busqueda,setBusqueda]=useState('-')
  
  const hook=()=>{
    axios.get('http://localhost:3001/persons')
    .then(response=>{
      console.log(`se han obtenido ${response.data.length} notas desde el servidor`)
       setPersons(response.data)
    })
  }
   useEffect(hook,[])

   const buscar=(event)=>{
    setBusqueda(event.target.value)
  }

  const personasFiltradas=persons.filter(persona=>persona.name.toLowerCase().includes(busqueda.toLowerCase()))
  

  const addAddres=(event)=>{
    event.preventDefault()
    const nuevoContacto={
      name: newName,
      telefono:telefono,
      id:persons.length+1
    } 

    const existe=persons.some(persona=>persona.name===newName)

    existe?alert(newName +' ya esta en la lista'):setPersons(persons.concat(nuevoContacto))
    setNewName('Nuevo contacto')
    SetTelefono('Ingresa un numero')
  }

  const cambioDeNombre=(event)=>{
    setNewName(event.target.value)
  }

  const agregarTelefono=(event)=>{
    SetTelefono(event.target.value)
  }

  return (
    <div>
      <div>
        <h2>Busqueda</h2>
        filtrar por <input  onChange={buscar}/> 
        <ul>
          {personasFiltradas.map(persona=>
            <Lista key={persona.id} persona={persona}/>)}
        </ul>
      </div>
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={addAddres}>
          <div>
            name: <input value={newName} onChange={cambioDeNombre}/>
          </div>
          <div>
            telefono: <input value={telefono} onChange={agregarTelefono}/>
          </div>
          <div>
            <button type="submit" >add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <ul>
          {persons.map(persona=>
            <Lista key={persona.id} persona={persona}/>)}
        </ul>
      </div>
    </div>
  )
}

export default App
