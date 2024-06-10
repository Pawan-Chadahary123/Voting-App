const jwt = require('jsonwebtoken')


const jwthauthmiddleware=  (req,res,next) => {

    //extract the jwt token from the request    !!
    const token = req.header.authorization.split(' ')[1];

    if(!token){
        return res.status(401).json({error:'UnAuthorized'})

    }

    try {

        //verify the token !!
        const decoded =  jwt.verify(token , process.env.SECRET_KEY )

        req.user = decoded
        next();
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({message:'Invalid Token'})

        
    }


}


//token Generation :

const generatetoken = (userdata)=>{

    return jwt.sign(userdata ,process.env.SECRET_KEY);

    
}
module.exports = {jwthauthmiddleware,generatetoken }