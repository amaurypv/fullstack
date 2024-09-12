const Lista=({persona,eliminar})=>{
    return(
        <div>
             <li className="listaCompleta" key={persona.key}>{persona.name} {persona.number} <button onClick={eliminar}>Eliminar</button> </li>
        </div>
    )

}


export default Lista