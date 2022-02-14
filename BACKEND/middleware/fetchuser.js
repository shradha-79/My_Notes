var jwt = require('jsonwebtoken');
const JWT_SECRET = 'iNotebook@project';

const fetchuser = (req, res, next)=>{
    // Get the user from the jwt and add id to req object 
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
    try {
        //verifying authtoken with JWT_SECRET and taking out id from authtoken
        const data = jwt.verify(token, JWT_SECRET);
        //giving user to request.user
        req.user = data.user;
        //calling next func that is async func of auth.js in route3
        next()
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
    
}
module.exports = fetchuser;