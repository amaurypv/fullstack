//importar la lista de blogs del archivo blogsList 
const blog = require('../models/blog')
const listaBlogs=require('./blogsList')

const dummy=(blogs)=>{
    return 1
}

//Define una nueva función totalLikes que recibe una lista de publicaciones de blogs como parámetro. La función devuelve la suma total de likes en todas las publicaciones del blog.

const totalLikes=(array)=>{
    const suma=array.reduce((acum,act)=>acum+act.likes,0)
    return suma
}
// Define una nueva función favoriteBlog que recibe una lista de blogs como parámetro. La función descubre qué blog tiene más me gusta. Si hay muchos favoritos, basta con devolver uno de ellos.

const favoriteBlog=(array)=>{
    //primero se hace una lista con el numero de likes de cada blog
    const listaLikes=array.map(blog=>blog.likes)
    //de la lista anterior se toma el numero máximo
    const maximoLike=Math.max(...listaLikes)

    //se busca el blog que tiene el numero maximo de likes tomado de la variable maximoLike
    const encontrado= array.find(blog=>maximoLike==blog.likes)
    //retornar de la constante el titulo, autor y likes
    return {title:encontrado.title, author:encontrado.author, likes:encontrado.likes}
}


const mostBlogs=(array)=>{
    let nombres=array.map(blog=>blog.author)
    let conteo={}
    nombres.forEach(nombre=>conteo[nombre]=(conteo[nombre]||0)+1)
    let numeroMax=0
    let nombreMax=''
    for (let nombre in conteo){
        if(conteo[nombre]>numeroMax){
            nombreMax=nombre
            numeroMax=conteo[nombre]
        }
    }
    return nombreMax
}


module.exports={dummy,totalLikes,favoriteBlog,}

