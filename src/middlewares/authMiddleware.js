const jwt = require('jsonwebtoken');
require('dotenv').config();
const token = require('../utils/generateToken');
 
module.exports = (req, res, next) => {
 
    const token = req.headers.authorization;
 
    if (!token) return res.status(401).json({ msg: 'Sem token!' });
 
    try {
 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
 
        req.usuarioId = decoded.id;
 
        next();
       
    } catch (error) {
       
        return res.status(401).json({ msg: 'Token invalido!' });
    }
     
};
 