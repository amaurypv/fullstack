
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  return (
    <div>
      <Header course={course}/>
      <Content part={part1}/>
      <Content part={part2}/>
      <Content part={part3}/>
      <Total part1={part1} part2={part2} part3={part3}/> 
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
    <p>{props.name} , {props.exercises}</p>
    </>
  )
}

const Content=(props)=>{
  console.log (props)
  return(
    <>
    <p>{props.part.name} {props.part.exercises}</p>
    </>
  )
}

const Total=(props)=>{
  return(
<>
<p>{props.part1.exercises+props.part2.exercises+props.part3.exercises}</p>
</>    
  )
}

export default App