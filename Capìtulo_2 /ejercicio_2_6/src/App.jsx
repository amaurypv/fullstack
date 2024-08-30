import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' ,
      id:1}
  ]) 
  const [newName, setNewName] = useState('Agrega un contacto')
  //esta es la funcion que se va a ejecutar cada vez que se envíe el formulario 
  //por lo que debe de ir como un argumento dentro del elemento form
  //como onSubmit={} ya que queremos que se ejecute cuando se envie el formulario
  const addAddres=(event)=>{
    //el event.preventDefault() impide que se actualice de forma automatica
    //la pagina ya que siempre que se envia la forma por default se actualiza
    event.preventDefault()
    //se define el nuevo elemento que se queire agregar
    const nuevoContacto={
      //el nuevo nombre va a ser igual al que se pone en el input que se define como newName
      name: newName,
      id:persons.length+1
    } 
    //se va a definir el nuevo estado de personas
    setPersons(persons.concat(nuevoContacto))
    //lo que queremos que aparezca en el input
    setNewName('Nuevo contacto')
  }
  //se define el nombre tomando el valor que se pone el input
  //esta funcion se va a definir en el input como onChange={cambioDeNombre}
  //para que el valor que se envie por medio de la formula defina el estado 
  //newName con el valor que se puso en el input
  const cambioDeNombre=(event)=>{
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addAddres}>
        <div>
          name: <input value={newName} onChange={cambioDeNombre}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/* se va a definir una lista por cada elemento que se encuentre
      en los estados persons */}
      <ul>
        {persons.map(persona=>
          <li key={persona.id}>{persona.name}</li>)}
      </ul>
    </div>
  )
}

export default App
