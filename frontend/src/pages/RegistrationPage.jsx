import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import api from '../services/api'
import authService from '../services/auth'
import { useAuth } from '../context/authContext'
import LoadingSpinner from '../components/LoadingSpinner'
import Footer from '../components/Footer';

const RegistrationPage = () => {
    const [formData, setFormData] = useState(
        {
            full_name: '',
            username: '',
            email: '',
            password: '',
            confirm_password: '',
        }

    );
    const [loading, setLoading] = useState(false);
    

    const {login} = useAuth();
    const navigate = useNavigate()

    const handleChange = (e) =>
    {
        setFormData({...formData,
            [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (formData.password !== formData.confirm_password) {
            toast.error("Passwords do not match!");
            setLoading(false);
            return;
        }
        try {
            const res = await authService.register(formData);
            if(res.user)
            {
                localStorage.setItem('token',res.token);
                login(res.user);
                navigate('/');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed. Try again.')
        }finally{
            setLoading(false);
        }
    }
    if (loading) return <LoadingSpinner />
     useEffect(()=>
        {
            document.title = "Register";
        },[]);
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
                <form className="card w-full max-w-sm bg-base-100 shadow-xl p-6" onSubmit={handleSubmit}>

                    <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

                    <div className="form-control mb-3">
                        <label className="label">
                            <span className="label-text">Full Name</span>
                        </label>
                        <input
                            type="text"
                            name="full_name"
                            placeholder="Enter full name"
                            className="input input-bordered w-full"
                            value={formData.full_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-control mb-3">
                        <label className="label">
                            <span className="label-text">Username</span>
                        </label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            className="input input-bordered w-full"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>

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
                        />
                    </div>


                    <div className="form-control mb-4">
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
                        />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <input
                            type="password"
                            name="confirm_password"
                            placeholder="Confirm password"
                            className="input input-bordered w-full"
                            value={formData.confirm_password}
                            onChange={handleChange}
                        />

                    </div>
                    <button type="submit" className="btn btn-primary w-full">Register</button>

                    <div className="text-center">
                        <p className="text-sm">Already have an account?</p>
                        <Link to="/login" className="link link-primary font-semibold">
                            Log in
                        </Link>
                    </div>

                </form>
            </div>
              <Footer />
        </>
    )
}

export default RegistrationPage
