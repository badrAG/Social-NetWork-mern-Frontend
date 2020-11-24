export const saveUserToLocalStorage = (jwt)=>{
    localStorage.setItem("jwt",JSON.stringify(jwt))
}

export const isLogged = ()=>{
    if(localStorage.getItem("jwt"))
    {
        return JSON.parse(localStorage.getItem("jwt"));
    }else{
        return false;
    }
}

export const logout = (cb)=>{
    localStorage.removeItem("jwt");
    document.cookie = "t=;expires=Thu, 01 Jan 1998 00:00:00 UTC;path=/"
    cb();
}

export const checkAuth = (userId)=>{
    return isLogged() && isLogged().user._id ===userId;
}