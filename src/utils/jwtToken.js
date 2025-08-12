const jwt = require('jsonwebtoken');
const Vars = require('../config/var');

const decode = (token) => {
  let payload;
  try{
    payload = jwt.verify(token,Vars.jwtSecret);
  }catch(err){
    payload = null;
  }
  return payload;
}

const encode = (payload,options) => {
  return jwt.sign(payload,Vars.jwtSecret,options);
}

module.exports = {
  encode,decode
}
