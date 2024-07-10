const Cursos=({courses})=>{
    return(
      <div>
        <h1>Web Development Curriculum</h1>
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

  export default Cursos
