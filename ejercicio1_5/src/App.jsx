
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course['name']}/>
      <Content course={course['parts']}/>
      <Total course={course['parts']}/>
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

const Content=(props)=>{
  console.log (props)
  return(
    <>
    <p>{props.course[0].name} {props.course[0].exercises}</p>
    <p>{props.course[1].name} {props.course[1].exercises}</p>
    <p>{props.course[2].name} {props.course[2].exercises}</p>
    </>
  )
}

const Total=(props)=>{
  return(
<>
<p>{props.course[0].exercises+ props.course[1].exercises+props.course[2].exercises}</p>
</>    
  )
}

export default App