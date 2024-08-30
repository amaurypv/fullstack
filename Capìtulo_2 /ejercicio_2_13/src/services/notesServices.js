import axios from 'axios'

const urlBase='http://localhost:3001/persons'

const getAll=()=>{
    const request=axios.get(urlBase)
    return request.then(response=>response.data)
}

const nuevoContacto=(nuevo)=>{
    const request=axios.post(urlBase,nuevo)
    return request.then(response=>response.data)
}

export default {getAll,nuevoContacto}