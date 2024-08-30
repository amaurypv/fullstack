import { useState,useEffect } from 'react'
import Lista from './components/lista'
import notesServices from './services/notesServices'
import './index.css'
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
    //buscamos el objeto de la persona que ya esta en la lista
    const contactoExiste=persons.find(nombre=>nombre.name==newName)
    //se actualiza el objeto con el nuevo numero
    //la parte de los ... es para crear un nuevo objeto que contenga lo mismo 
    //despues de la (,) se pone lo que se quiere cambiar, en este caso se cambia 
    //el telefono con el valor  
    const contactoActualizado={...contactoExiste,telefono:telefono}
    //se va a modificar el post, por la funcion que se importo desde noteServices.js
    // axios.post('http://localhost:3001/persons',nuevoContacto)
    if(!existe){
      //si el contacto no existe, solo se va a agregar el contacto mediante un request POST
      notesServices.nuevoContacto(nuevoContacto)
    .then(nuevo=>{
      setPersons(persons.concat(nuevo))
      setNewName('Nuevo contacto')
      SetTelefono('Ingresa un numero')
      console.log('se ha agregado un nuevo contacto', nuevo)
    })
    }else{
      //si el contacto ya existe, se va a hacer un request PUT para eso se necesita el id
      //y el objeto que contiene el contacto existente, pero con el numero modificado
      //con esta variable enviamos una alerta que pregunta si seguir o no, 
      //si se da aceptar manda un true a la variable
      const confirmacion =window.confirm(`${contactoExiste.name} ya existe, desea reemplazar el numero?`)
      //si la variable es true entonces se cambia el numero del contacto existente.
      if(confirmacion){
        //se llama la variable desde el archivo noteServices para actualizar datos
        //pide 2 argumentos, el id, y el contacto con el numero actualizado previamente definido
        notesServices.actualizar(contactoExiste.id,contactoActualizado)
        .then(nuevoNumero=>{
          //se va a definir el nuevo estado incluyendo el contacto con el numero actualizado
          //se hace un map por todo el estado persons para crear un nuevo array pero 
          //con la condicion de cambiar el elemento que tenga el id del contacto que tiene el numero que se va a cambiar
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
      console.error('Error al intentar eliminar el contacto:', error);
 
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
