/* 
Refactoriza tu aplicación para que la visualización de las estadísticas se extraiga en su propio componente Statistics. 
El estado de la aplicación debe permanecer en el componente raíz App.*/

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

    const Estadisticas=({positivo,neutral,negativo,resultado})=>{
        const total=resultado.length
        let promedioGeneral
        let promedioPositivo
        if(total>0){
            const sumatoria=resultado.reduce((acc,acu)=>acc+acu)
            promedioGeneral=(sumatoria/total)
            promedioPositivo=(positivo/total)*100
            
            return(
            <>
            <h1>Estadisticas</h1>
            <h3>Positivo {positivo}</h3>
            <h3>Neutral {neutral}</h3>
            <h3>Negativo {negativo}</h3>
            <h3>Total {total}</h3>
            <h3> promedio general {promedioGeneral}</h3>
            <h3>positivos {promedioPositivo}</h3>
            </>
            )
        }else{
            return(
                <>
                <h2>Sin datos</h2>
                </>
            )
        }                
    }

    return(
        <div>
            <h1>give feedback</h1>
            <Boton funcion={bueno} texto='bueno'/>
            <Boton funcion={normal} texto='normal'/>
            <Boton funcion={malo} texto='malo'/>
            <Estadisticas positivo={positivo} negativo={negativo} neutral={neutral} resultado={resultado}/>
        </div>
    )
  
}

export default App
