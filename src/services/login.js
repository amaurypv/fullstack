import axios from "axios"
const baseURL='/api/login'

//se crea una funcion para comprobar el usuario, en el backend se tiene un request POST con la url  /api/login en la que se solicita un username y un password, el request hace la busqueda del usuario en la base de datos de usuarios, y ademas hace la comparacion del password convertido con bcrypt, si se cumple con los dos, envia los datos del token, username y id. 
const crearUsuario=async(credenciales)=>{
    const usuario =await axios.post(baseURL,credenciales)
    return usuario.data
}

export default {crearUsuario}