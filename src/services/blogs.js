import axios from 'axios'
const baseUrl = '/api/blogs'
let token=null

const setToken=nuevToken=>{
  token=`Bearer ${nuevToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (datos) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, datos, config);
  return response.data;
};


export default { getAll ,setToken, createBlog}