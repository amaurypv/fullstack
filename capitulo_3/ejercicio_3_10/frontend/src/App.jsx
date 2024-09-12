import { useState,useEffect } from 'react'
import Lista from './components/lista'
import notesServices from './services/notesServices'
import './index.css'
function App() {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('Agrega un nombre')
  const [telefono,SetTelefono]=useState('Numero de telefono')
  const [busqueda,setBusqueda]=useState('-')
  //se va a definir un nuevo estado que muestre el mensaje requerido 
  //en este caso debe un contacto agregado
  const [mensajeContacto,setMensajeContacto]=useState()
  const [mensajeError,setMensajeError]=useState()
  //se va a agregar una funcion que muestre el mensaje 
  const Mensaje=({mensaje})=>{
    if(mensaje==null){
      return null
    }
    return(
      <div className='mensaje'>
        {mensaje}
      </div>
    )
  }

  const MensajeError=({mensaje})=>{
    if(mensaje==null){
      return null
    }
    return(
      <div className='error'>
        {mensaje}
      </div>
    )
  }


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
    const contactoExiste=persons.find(nombre=>nombre.name==newName)
     const contactoActualizado={...contactoExiste,telefono:telefono}
    if(!existe){
      notesServices.nuevoContacto(nuevoContacto)
    .then(nuevo=>{
      setPersons(persons.concat(nuevo))
      setNewName('Nuevo contacto')
      SetTelefono('Ingresa un numero')
      console.log('se ha agregado un nuevo contacto', nuevo)

      setMensajeContacto(`se agregó ${nuevo.name} a la lista`)
      setInterval(()=>{setMensajeContacto(null)},5000)
    })
    }else{
      const confirmacion =window.confirm(`${contactoExiste.name} ya existe, desea reemplazar el numero?`)
      if(confirmacion){
        notesServices.actualizar(contactoExiste.id,contactoActualizado)
        .then(nuevoNumero=>{
          const nuevaLista=persons.map(persona=>persona.id!==contactoExiste.id? persona:nuevoNumero)
          setPersons(nuevaLista)
          console.log(`se actualizo el contacto ${contactoExiste.name} con el numero ${nuevoNumero.telefono}`)}
          )
      }
    }
    
  }

  const cambioDeNombre=(event)=>{
    setNewName(event.target.value)
  }

  const agregarTelefono=(event)=>{
    SetTelefono(event.target.value)
  }


  const eliminarContacto=(id)=>{
 
    notesServices.eliminar(id)
    .then(() => {
       setPersons(persons.filter(persona => persona.id !== id));
    })
    .catch(error => {
      console.error('Error al intentar eliminar el contacto:', error)
      setMensajeError(error.message)
      setTimeout(()=>setMensajeError(null),3000)
      setPersons(persons.filter(persona => persona.id !== id));
      });
}
  return (
    <div>
      <div>
        <h1>LIBRETA DE CONTACTOS</h1>
        <Mensaje mensaje={mensajeContacto}/>
        <MensajeError mensaje={mensajeError}/>
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
