function App() {

  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

const Course=({course})=>{
  return(
    <div>
      <h1>{course.name}</h1>
      <ul>
        {course['parts'].map(parte=>
          <li key={parte.id}>{parte.name} {parte.exercises}</li>)}
      </ul>
      <Sumatoria course={course}/>
    </div>
  )
}

//usar una funcion en donde se sumen todos los ejercicios del curso. 
const Sumatoria=({course})=>{
  //
  return(
    <>
      <h3>Total of {course['parts'].reduce((acc,arr)=>acc+arr.exercises,0)} exercises </h3>
    </>
  )
}



export default App