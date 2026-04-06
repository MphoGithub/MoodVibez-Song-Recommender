import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import authService from '../services/auth'
import { useAuth } from '../context/authContext'
import LoadingSpinner from '../components/LoadingSpinner'
import Footer from '../components/Footer';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();
    
    useEffect(()=>
    {
        document.title = "Login";
    },[]);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await authService.login(formData);
            if (res.user) {
                localStorage.setItem('token', res.token);
                login(res.user);
                navigate('/');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;


    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
                <form className="card w-full max-w-sm bg-base-100 shadow-xl p-6" onSubmit={handleSubmit}>

                    <h2 className="text-2xl font-bold text-center mb-4">Log In</h2>

                    <div className="form-control mb-3">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            className="input input-bordered w-full"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-control mb-6">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            className="input input-bordered w-full"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-full">Log In</button>

                    <div className="text-center mt-4">
                        <p className="text-sm">Don't have an account?</p>
                        <Link to="/register" className="link link-primary font-semibold">
                            Register
                        </Link>
                    </div>

                </form>
            </div>
              <Footer />
        </>
    );
};

export default LoginPage;