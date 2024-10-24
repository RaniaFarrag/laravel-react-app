import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthComponent = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token'); 
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [navigate]);

    return isAuthenticated;
};

export default useAuthComponent;
