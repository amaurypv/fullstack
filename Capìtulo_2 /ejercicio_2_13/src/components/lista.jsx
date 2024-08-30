const Lista=({persona})=>{
    return(
        <div>
             <li key={persona.key}>{persona.name} {persona.telefono}</li>
        </div>
    )

}

export default Lista