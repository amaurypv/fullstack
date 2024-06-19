
const App = () => {
  const course = 'Half Stack application development'

  const part =[ 
    {nombre:'Fundamentals of React', ejercicios: 10},
    {nombre : 'Using props to pass data', ejercicios :7},
    {nombre : 'State of a component',ejercicios: 14}]

  return (
    <div>
      <Header course={course}/>
      <Content part={part} />
      <Total suma={part[0].ejercicios+part[1].ejercicios+part[2].ejercicios}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part=(props)=>{
  return(
    <>
    <p>{props.nombre} , {props.ejercicios}</p>
    </>
  )
}

const Content=(props)=>{
  return(
    <>
    <Part nombre={props.part[0].nombre} ejercicios={props.part[0].ejercicios}/>
    <Part nombre={props.part[1].nombre} ejercicios={props.part[1].ejercicios}/>
    <Part nombre={props.part[2].nombre} ejercicios={props.part[2].ejercicios}/>
    </>
  )
}

const Total=(props)=>{
  return(
<>
<p>{props.suma}</p>
</>    
  )
}

export default App