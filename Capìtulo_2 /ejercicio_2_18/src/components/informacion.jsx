
const Info=({pais})=>{
    if(pais.name){
        const idiomas=Object.values(pais.languages)
        const bandera=pais.flags.png
        return(
        <div>
            <h1>  {pais.name.common}</h1>
            <p>capital: {pais.capital}</p>
            <p>area: {pais.area}</p>
            <h2>languages:</h2>
            <ul>
                {idiomas.map(l=><li key={l}>{l}</li>)}
            </ul>
            <img src={bandera} alt='bandera'/>

        </div>
        )
    }
}

export default Info