import { useEffect, useState } from "react";
import { getToken } from "../src/helpers";
import { AuthContext } from "../context/authContext";

import { message } from "antd";

const AuthProvider = ({ children }) => {
    const [ userData, setUserData ] = useState();
    const API = process.env.REACT_APP_API;
    const BEARER=process.env.BEARER

    const authToken = getToken();

    const fetchLoggedInUser = async token => {
        try {
            const response = await fetch(`${API}/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = response.json();

            setUserData(data);
        } catch (error) {
            console.log(error);
            message.error("Error while getting logged in user details.");
        }
    };

    const handleUser = user => {
        setUserData(user);
    };

    useEffect(() => {
        if (authToken) {
            fetchLoggedInUser(authToken);
        }
    }, [ authToken ]);

    return (
        <AuthContext.Provider value={{ user: userData, setUser: handleUser }}>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthProvider;