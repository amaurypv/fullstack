
/*
Como la mayoría de las empresas, Unicafe recopila comentarios de sus clientes. 
Tu tarea es implementar una aplicación web para recopilar comentarios de los clientes. 
Solo hay tres opciones para los comentarios: good (bueno), neutral y bad(malo).
La aplicación debe mostrar el número total de comentarios recopilados para cada categoría.
Amplía tu aplicación para que muestre más estadísticas sobre los comentarios recopilados:
el número total de comentarios recopilados, la puntuación promedio (buena: 1, neutral: 0, mala: -1) y el porcentaje de comentarios positivos.


*/
import { useState } from 'react'

function App() {
    const [positivo, setPositivo]=useState(0)
    const [negativo, setNegativo]=useState(0)
    const [neutral, setNeutral]=useState(0)
    const [resultado, setResultado]=useState([])
    const Boton=({funcion, texto})=>{
        return(
            <button onClick={funcion}>{texto}</button>
        )
    }
    const bueno=()=>{
        setPositivo(positivo+1)
        setResultado(resultado.concat(1))
        console.log(resultado)
    }
    const malo=()=>{
        setNegativo(negativo+1)
        setResultado(resultado.concat(-1))
        console.log(resultado)
    }
    const normal=()=>{
        setNeutral(neutral+1)
        setResultado(resultado.concat(0))
        console.log(resultado)
    }
    const Marcador=(props)=>{
        return(
        <>
        <h3>{props.texto} {props.resultado}</h3>
        </>)
        }
    const Promedio=({lista})=>{
        if(lista.length>0){
            const suma=lista.reduce((acc,cur)=>{
                return acc+cur
            })
            const media=(suma/(lista.length))
            return(
                <>
                <h3>promedio {media}</h3>
                </>
            )
        }
    }
    const Total=({lista})=>{
        return(
            <>
            <h3>total {lista.length}</h3>
            </>
        )
    }

    const PromedioPositivo=({positivo,resultado})=>{
        const promedio=(positivo/resultado.length)*100
        return(
            <>
            <h3>positivos {promedio}% </h3>
            </>
        )
        
    }
    return(
        <div>
            <h1>give feedback</h1>
            <Boton funcion={bueno} texto='bueno'/>
            <Boton funcion={normal} texto='normal'/>
            <Boton funcion={malo} texto='malo'/>
            <h1>Estadisticas</h1>
            <Marcador resultado={positivo} texto='bueno'/>
            <Marcador resultado={neutral} texto='neutral'/>
            <Marcador resultado={negativo} texto='negativo'/>
            <Total lista={resultado}/>
            <Promedio lista={resultado}/>
            <PromedioPositivo positivo={positivo} resultado={resultado}/>
        </div>
    )
  
}

export default App
