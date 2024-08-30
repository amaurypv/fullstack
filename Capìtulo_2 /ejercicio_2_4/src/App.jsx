function App() {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

 return(
  <>
  <Cursos courses={courses}/> 
  </>
 )
}

const Cursos=({courses})=>{
  return(
    <div>
      {courses.map(curso=>
        <div key={curso.id}>
          <h2 key={curso.id}>{curso.name}</h2>
          <ul>
          {curso['parts'].map(materia=>
            <li key={materia.id}>{materia.name} {materia.exercises}</li>)}
          </ul>
          <h3>Total de ejercicios {curso['parts'].reduce((acc,arr)=>acc+arr.exercises,0)}</h3>
        </div>
      )
      }
    </div>  
  )
}



export default App