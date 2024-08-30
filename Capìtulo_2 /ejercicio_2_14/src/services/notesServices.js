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

const eliminar = (id) => {
    //a diferencia de las anteriores, aqui no se define 
    return axios.delete(`${urlBase}/${id}`)
      .then(response => {
        console.log('Contacto eliminado:', response.data);
        return response.data;
      })
      .catch(error => {
        console.error('Error al eliminar el contacto:', error);
        throw error; // Rethrow the error to handle it where the function is called
      });
  }

export default {getAll,nuevoContacto,eliminar}