import { createContext,
    useContext,
    useState,useEffect, } from "react";
import authService from "../services/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) =>
{
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const checkAuth = async () =>{
            try {
                const data = await authService.getCurrentUser();
                setUser(data.user);
                
            } catch (error) {
                setUser(null);
            }finally{
                setLoading(false);
            }

        };
        checkAuth();
    },[])
    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);
    
    return (
        <AuthContext.Provider value={{user,login,logout,loading}}>
        {children}
        </AuthContext.Provider>
    )
}

