const Lista=({estado})=>{
    return(
        <div>
            <ul>
                {estado.map(elemento=>{
                    <li key={elemento.key}>{elemento.name} {elemento.telefono}</li>
                })}
            </ul>

        </div>
    )

}

export default Lista