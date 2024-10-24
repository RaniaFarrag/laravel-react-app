import { useNavigate } from 'react-router-dom';

const useLogout = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('access_token');
        navigate('/login'); 
    };

    return logout;
};

export default useLogout;
