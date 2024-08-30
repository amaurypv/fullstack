import { useState,useEffect } from 'react'
import Lista from './components/lista'
import notesServices from './services/notesServices'
function App() {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('Agrega un nombre')
  const [telefono,SetTelefono]=useState('Numero de telefono')
  
  const [busqueda,setBusqueda]=useState('-')

  const hook=()=>{
    notesServices.getAll()
    .then(contactos=>{
      console.log(`se han obtenido ${contactos.length} notas desde el servidor`)
      setPersons(contactos)
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
    } 

    const existe=persons.some(persona=>persona.name===newName)
    //se va a modificar el post, por la funcion que se importo desde noteServices.js
    // axios.post('http://localhost:3001/persons',nuevoContacto)
    notesServices.nuevoContacto(nuevoContacto)
    .then(nuevo=>{
      //para actualizar el estado se debe de poner setPersons y tomar el response data
      existe?alert(newName +' ya esta en la lista'):setPersons(persons.concat(nuevo))
      setNewName('Nuevo contacto')
      SetTelefono('Ingresa un numero')
      console.log('se ha agregado un nuevo contacto', nuevo)
    })
  }

  const cambioDeNombre=(event)=>{
    setNewName(event.target.value)
  }

  const agregarTelefono=(event)=>{
    SetTelefono(event.target.value)
  }

  //se va a agregar la funcion que se va a ejecutar cada vez que se haga click en el boton
  //se va a agregar un request DELETE, y por lo tanto se tiene que actualizar el estado
  const eliminarContacto=(id)=>{
    //primero se obtiene el id del contacto, desde la lista
    notesServices.eliminar(id)
    .then(() => {
      // Filtrar el estado 'persons' para eliminar el contacto con el ID especificado
      setPersons(persons.filter(persona => persona.id !== id));
    })
    .catch(error => {
      console.error('Error al intentar eliminar el contacto:', error);
      // Aquí puedes manejar el error, mostrar una alerta al usuario, etc.
    });
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
            <Lista key={persona.id} persona={persona} eliminar={()=>eliminarContacto(persona.id)}/>)}
        </ul>
      </div>
    </div>
  )
}

export default App
