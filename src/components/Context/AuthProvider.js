import { Spin } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';
export const AuthContext = React.createContext();
export default function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    React.useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUserInfo({ displayName, email, uid, photoURL });
                setIsLoading(false);
                navigate('/');
                return;
            }
            setIsLoading(false);
            navigate('/login');
        });
        return () => {
            unsubscribed();
        };
    }, [navigate]);

    return (
        <div>
            <AuthContext.Provider value={userInfo}>
                {isLoading ? <Spin /> : children}
            </AuthContext.Provider>
        </div>
    );
}
