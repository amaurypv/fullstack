import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      telefono:123456789,
      id:1}
  ]) 
  const [newName, setNewName] = useState('Agrega un nombre')
  //se va agregar un input en donde se agrege el numero de telefono 
  //y este numero se agregue a la lista junto con el nombre

  const [telefono,SetTelefono]=useState('Numero de telefono')
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

  //se define la funcion que se quiere hacer con el valor del input del telefono
  const agregarTelefono=(event)=>{
    SetTelefono(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addAddres}>
        <div>
          name: <input value={newName} onChange={cambioDeNombre}/>
        </div>
        <div>
          {/* se va agregar un nuevo input con el valor del numero de telefono */}
          telefono: <input value={telefono} onChange={agregarTelefono}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <ul>
        {persons.map(persona=>
          <li key={persona.id}>{persona.name} {persona.telefono}</li>)} 
      </ul>
    </div>
  )
}

export default App
