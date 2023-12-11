import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token)=>{},
    logout: ()=>{}
});


export const AuthContextProvider = (props)=>{
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);
    const history = useHistory();
    const userIsLoggedIn = !!token;
    
    const loginHandler = (token)=>{
        setToken(token);
        localStorage.setItem('token', token);
    }
    const logoutHandler = ()=>{
        setToken(null);
        localStorage.removeItem('token');
    }
    useEffect(()=>{
        if(userIsLoggedIn){
            const timer = setTimeout(()=>{
                logoutHandler();
                history.replace('/');
            },5000);
            return ()=>{
                clearTimeout(timer);
            }
        }
    },[userIsLoggedIn, history]);
    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }
    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;