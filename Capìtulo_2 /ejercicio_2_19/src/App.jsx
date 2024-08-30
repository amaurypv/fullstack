import { useState, useEffect } from 'react'
import axios from 'axios'
import Info from './components/informacion'


function App() {
  const [pais,setPais]=useState('')
  const [infoPais,setInfoPais]=useState([])
  const [listaPaises, setListaPaises]= useState([])
  
  //se va a definir la lista de paises a partir 
  const lista=()=>{
  axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
  .then(response=>{
    console.log('se ha actualizado la lista de paises')
    setListaPaises(response.data)})
  }

  const paisesFiltrado=listaPaises.filter(nombre=>nombre.name.common.toLowerCase().includes(pais.toLowerCase()))
  
  useEffect(lista,[])  
  const envioForma=(event)=>{
    event.preventDefault()
    console.log(`se envio el pais ${pais}`)
  }
  
  const cambioPais=(event)=>{
    console.log(event.target.value)
    setPais(event.target.value)
    }
  

  const mostrar=(pais)=>{
    const paisFiltrado=pais.name.common
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${paisFiltrado}`)
      .then(response=>{
        console.log(`la capital de ${response.data.name.common} es ${response.data.capital} `)
        setInfoPais(response.data)
      })
  }
  
  return (
      <div>
        <form onSubmit={envioForma}>
          <input type='text' value={pais} onChange={cambioPais}/>
          <button type='submit'>enviar</button>
        </form>
        <ul>
        {paisesFiltrado.map(pais=><li key={pais.cca3}>{pais.name.common} <button onClick={()=>mostrar(pais)}> {pais.cca3}</button></li>)}
        </ul>
        <div>
          <Info pais={infoPais}/>
        </div>
       </div>

  )
}

export default App
