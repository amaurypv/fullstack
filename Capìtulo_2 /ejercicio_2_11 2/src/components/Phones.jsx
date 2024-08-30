const Telefonos=({persona})=>{
return(
<li key={persona.id}>{persona.name} {persona.number}</li>
)}

export default Telefonos