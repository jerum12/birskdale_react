import jwt from 'jsonwebtoken'
import moment from 'moment'

export const login = (token) => {
    localStorage.setItem("", token);
}

export const logout = () => {
    localStorage.removeItem("");
}

export const checkLogIn = () => {
    var isExpired = false;
    let token = localStorage.getItem('jwtTokenKey');
    token = token.replace('Bearer ', '');
    var decodedToken = jwt.decode(token);

    var dateNow = new Date();


    if(decodedToken.exp < dateNow.getTime())
        isExpired = true;

    console.log( dateNow.getTime())
    console.log(decodedToken)

    return isExpired;
}