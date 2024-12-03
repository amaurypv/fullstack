import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
//se importan las funciones que se usarán para crear un token 
import loginServices from './services/login'
import './estilo.css'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user,setUser]=useState(null)
  //se define un estado con las variables {username y password} para que se actualice dependiendo de la variable con la que se trabaja. 
  const [formData, setFormData]=useState({username:'',password:''})
  const [formBlog,setFormBlog]=useState({title:'',author:'',url:''})
  const [mensaje,setMensaje]=useState(null)  

  //se va a definir la funcion para obtener los datos desde el input. 
  const handleChange=(event)=>{
    //se definen las variables name y value se van a tomar desde el input con eent.target, dentro del input se define el nombre (name) y el valor del input (value)
    let {name,value}=event.target
    //se actualiza el estado de setFormData, dependiendo del nombre de la variable que puede ser:username o password y se actualiza con el valor 
    setFormData(prevData=>({...prevData,[name]: value}))
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  const submitLogin=async(event)=>{
    //se usa para que no se actualice la pagina al hacer click en el boton
    const {username,password}=formData
    event.preventDefault()
    //se va hacer un request enviando el usuario y la contraseña para crear un usuario
    const usuario=await loginServices.crearUsuario({username,password})
    //se guardan los valores obtenidos del usuario en el almacenamiento local, convertidos a json
    window.localStorage.setItem('datosUsuario',JSON.stringify(usuario))
    //se le da formato al token
    blogService.setToken(usuario.token) 
    setFormData({username:'',password:''})
    setMensaje('has iniciado sesión')
    setTimeout(() => {setMensaje(null)
    }, 3000);
  }

  //se tiene que hacer un useState para obtener los datos desde el almacenamiento local 
  useEffect(()=>{
    const datosUsuario=window.localStorage.getItem('datosUsuario')
    //si se cuenta con un dato de usuario se guarda en una variable usuario y se guarda en el estado user
    if(datosUsuario){
      const usuario=JSON.parse(datosUsuario)
      setUser(usuario)
      blogService.setToken(usuario.token)
    }

  })
  const login=()=>{
    return(
      <div>
        <h2>log in to application</h2>
        <form onSubmit={submitLogin}>
          <div>
          username
          <input value={formData.username} name='username' onChange={handleChange}/>
          </div>
          <div>
          password
          <input value={formData.password} name='password' onChange={handleChange}/>
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }
  //se crea una funcion que se va a aplicar al boton al hacer click, para que elimine los datos del usuario. 
  const logOut=()=>{
    //se elimina del almacenamiento local la informacion datosUsuario con .removeItem('')
    window.localStorage.removeItem('datosUsuario')
    //se actualiza el estado de user a null para que se muestre de nuevo la parte de login
    setUser(null)
  }

  const submitBlog=async(event)=>{
    const {title,author,url}=formBlog
    event.preventDefault()
    try{
    const nuevoBlog=await blogService.createBlog({title,author,url})
    setBlogs(prevData=>[...prevData,nuevoBlog])
    setFormBlog({title:'',author:'',url:''})
    setMensaje(`un nuevo blog ${title} por ${author} ha sido agregado`)
    setTimeout(()=>{setMensaje(null)},5000)
    }catch(error){
      console.error('error al crear el blog',error.response?.data || error.message)
    }

  }

  const handleBlog=(event)=>{
    let {name,value}=event.target
    setFormBlog(prevData=>({...prevData,[name]:value}))
  }


  const crearBlog=()=>{
    return(
      <div>
        <div className='mensaje'>
          {mensaje}
        </div>
        <h3>{user.username} ha iniciado sesion</h3> <button onClick={logOut}>logOut</button>
        <div>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog}/>
          )}
        </div>
        <div>
          <h2> crear nuevo blog</h2>
          <form onSubmit={submitBlog}>
            <div>
              titulo  <input name='title' value={formBlog.title} onChange={handleBlog}/>
            </div>
            <div>
              autor  <input name='author' value={formBlog.author} onChange={handleBlog}/>
            </div>
            <div>
             url  <input name='url' value={formBlog.url} onChange={handleBlog}/>
            </div>
            <button type='submit'>crear Blog</button>
          </form>
        </div>
      </div>
    )
  }


  return (
    <div >
      {user===null?login():crearBlog()}   
    </div>
  )
}

export default App