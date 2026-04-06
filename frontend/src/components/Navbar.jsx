import { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import authService from '../services/auth'


const Navbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate();

    // 1. Get saved theme from localStorage or default to "light"
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });
    // 2. Apply the theme to <html> and save it whenever theme changes
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);
    // 3. Toggle between light and dark
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        logout();
        navigate('/login');

    }

    const handleDeleteAccount = async () => {
        if (!window.confirm('Are you sure you want to delete your account? This action can not be reversed.'))
            return;
        await authService.deleteUser();
        localStorage.removeItem('token');
        logout();
        navigate('/login');
    }
    return (

        <div className="navbar bg-base-300 shadow-sm
        border-b-4 border-base-200 
                hover:shadow-2xl hover:-translate-y-1 
                transition-all duration-300 ease-out 
                perspective-1000">
            <div className="flex-1">
                <Link to='/' className="btn btn-ghost text-xl" 
                style={{ fontFamily: "'Chewy', cursive" }}>MoodVibez</Link>
            </div>
            {user && (

                <>
                    <div className='flex'>
                        <label className="flex cursor-pointer gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>

                            {/* Theme toggler */}

                            <input type="checkbox"
                                checked={theme === 'light'}
                                onChange={toggleTheme}
                                className="toggle theme-controller" />

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5" />
                                <path
                                    d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                            </svg>
                        </label>
                    </div>
                    {/* Hamburger Menu */}
                    <div className="flex-none">
                        <div className='dropdown dropdown-end'>

                            <button tabIndex={0} className="btn btn-square btn-ghost m-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
                            </button>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li>
                                    <Link to='#' onClick={handleLogout}>Logout</Link>
                                </li>
                                <li>
                                    <Link to='#' onClick={handleDeleteAccount} className="text-error">Delete Account</Link>
                                </li>
                                <li>
                                    <Link to='/profile'>Edit Profile</Link>
                                </li>
                            </ul>
                        </div>

                    </div>
                </>
            )}
        </div>
    )
}

export default Navbar
