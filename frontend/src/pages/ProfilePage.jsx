import { useState,useEffect } from 'react';
import { useAuth } from '../context/authContext';
import authService from '../services/auth';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router';
import Footer from '../components/Footer';

const ProfilePage = () => {
    const { user, login, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        full_name: '',
        email:  '',
        username: '',
        password: '',
    });
    document.title = `Profile | ${user.username}`;
    useEffect(() => {
        if (user) {
            console.log("Current user:",user);
            setForm({
                full_name: user.full_name || user.name || '',  
                email: user.email || user.Email || '',
                username: user.username || '',
                password: '',
            });
        }
    }, [user]);

    const [submitting, setSubmitting] = useState(false);

  
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const payload = {};
        if (form.full_name) payload.full_name = form.full_name ;
        if (form.email) payload.email = form.email;
        if (form.username) payload.username = form.username;
        if (form.password) payload.password = form.password;

        try {
            const data = await authService.updateUserProfile(payload);
            
            login(data.user);                   
            setForm((prev) => ({ ...prev, password: '' })); 
            toast.success('Profile updated successfully!');
            navigate('/')
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

   
    if (authLoading) return <LoadingSpinner />;

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center p-4">
            <div className="card bg-base-100 shadow-md w-full max-w-md">
                <div className="card-body">
                    <h2 className="card-title text-2xl mb-4">Edit Profile</h2>

                    <form className="card w-full max-w-sm bg-base-100 shadow-xl p-6" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input
                                type="text"
                                name="full_name"
                                value={form.full_name}
                                onChange={handleChange}
                                className="input input-bordered"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="input input-bordered"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                className="input input-bordered"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">
                                    New Password 
                                    <span className="text-base-content/50 text-xs ml-1">
                                        (leave blank to keep current)
                                    </span>
                                </span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="input input-bordered"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary mt-2"
                            disabled={submitting}
                        >
                            {submitting ? (
                                <span className="loading loading-spinner loading-sm" />
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
          <Footer />
        </>
    );
};

export default ProfilePage;