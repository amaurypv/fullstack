import { useState,useEffect } from 'react'
import axios from 'axios'
import Telefonos from './components/Phones'

function App() {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('Agrega un nombre')
  const [telefono,SetTelefono]=useState('Numero de telefono')
  
  //se va agregar una nueva división en la pagina para buscar un nombre de contacto
  //se define un nuevo estado que contenga la busqueda
  const [busqueda,setBusqueda]=useState('-')

  // se hace una funcion para obtener el valor de la busqueda a traves del input
  const buscar=(event)=>{
    setBusqueda(event.target.value)
  }
  //se hace un filtro buscando en el estado personas 
  //primero se convierte el nombre del estado a minusculas
  //luego se usa .includes   
  const personasFiltradas=persons.filter(persona=>persona.name.toLowerCase().includes(busqueda.toLowerCase()))
  

  const addAddres=(event)=>{
    event.preventDefault()
    const nuevoContacto={
      name: newName,
      number:telefono,
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
  
  const hook=()=>{
    axios.get('http://localhost:3001/persons')
    .then(response=>{
      console.log(`datos obtenidos de db.json se cuentan con ${response.data.length} contactos`)
      setPersons(response.data)
    })
  }
  useEffect(hook,[])

  return (
    <div>
      <div>
        <h2>Busqueda</h2>
        {/* se agrega un input para buscar un nombre en la lista de contactos
        el valor de la busqueda se guarda en el estado busqueda 
        y cada vez que haya un cambio en el input se agregue al estado busqueda
        mediante la formula buscar()*/}
        filtrar por <input  onChange={buscar}/>
        {/* se genera una lista con los contactos filtrados que coincidan con el estado busqueda
        se hace un map para recorrer el estado personas y mostrar solo los nombres que coincidan
        con la busqueda*/} 
        <ul>
          {personasFiltradas.map(persona=><Telefonos key={persona.id} persona={persona}/>)}
        </ul>
      </div>
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
          {persons.map(persona=><Telefonos key={persona.id} persona={persona}/>)} 
        </ul>
      </div>
    </div>
  )
}

export default App
