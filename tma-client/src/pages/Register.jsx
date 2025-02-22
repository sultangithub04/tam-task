import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";

const Register = () => {
    const { createNewUser, setUser, updateUserProfile, signInWithGoogle,setLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleGoogle = () => {
        signInWithGoogle()
            .then((result) => {
                toast.success(result);
                navigate('/');
            })
            .catch((error) => {
                toast.error('ERROR:', error.message);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const name = form.get('name');
        const photo = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');

        // Reset errors
        setError({});

        // Validation
        if (password.length < 6) {
            setError((prev) => ({ ...prev, password: 'Password must be more than 6 characters' }));
            return;
        }
        if (!/[a-z]/.test(password)) {
            setError((prev) => ({ ...prev, password: 'Password must have at least one lowercase letter' }));
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setError((prev) => ({ ...prev, password: 'Password must have at least one uppercase letter' }));
            return;
        }

        createNewUser(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        navigate('/');
                        setLoading(false)
                    })
                    .catch((err) => {
                        console.error('Profile update error:', err);
                    });
            })
            .catch((err) => {
                setError((prev) => ({ ...prev, firebase: 'Registration failed. Try again.' }));
                console.error(err.code, err.message);
            });
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <h2 className="text-2xl font-semibold text-center">Register your Account</h2>
                <form onSubmit={handleSubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input name="name" type="text" placeholder="Name" className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input name="photo" type="text" placeholder="Photo URL" className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name="email" type="email" placeholder="Email" className="input input-bordered" required />
                    </div>

                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            className="input input-bordered"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="btn btn-xs absolute right-4 top-12"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {error.password && (
                            <p className="text-sm text-red-500 mt-1">
                                {error.password}
                            </p>
                        )}
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Register</button>
                    </div>
                </form>

                <div className="text-center">
                    <button onClick={handleGoogle} className="btn">
                        <FaGoogle className="mr-2" /> Google Login
                    </button>
                </div>
                <br />
                {error.firebase && (
                    <p className="text-sm text-red-500 text-center">
                        {error.firebase}
                    </p>
                )}
                <p className="text-center font-semibold">
                    Have an account?{' '}
                    <Link className="text-red-400" to="/login">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
