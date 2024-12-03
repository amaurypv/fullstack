const errorHandler=(error,req,res,next)=>{
    console.error(error.message)
    if(error.name==='ValidationError'){
        return res.status(404).json({error:error.message})
    }
    next(error)
}

//para poder generar un nuevo blog que se relacione con un usuario, primero hay que definir una funcion que obtenga el token generado desde login
const tokenCodificado=(req,res,next)=>{
    //req.get('Authorization') obtiene el valor del encabezado Authorization de la solicitud req. Este encabezado suele incluir el token en un formato como: "Bearer <token>".
    const autorizacion=req.get('Authorization')
    //Primero, el código verifica si existe un valor en autorizacion y si comienza con "Bearer ".
    //Si ambas condiciones se cumplen, usa replace('Bearer ', '') para quitar "Bearer " y dejar solo el token. Luego, regresa el token limpio.
    if(autorizacion&&autorizacion.startsWith('Bearer ')){
      req.token= autorizacion.replace('Bearer ','')
    }else{
    req.token= null
    }
    next()
  }

module.exports={errorHandler, tokenCodificado}