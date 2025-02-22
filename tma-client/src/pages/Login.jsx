import React, { useContext, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import toast from "react-hot-toast";
const Login = () => {
    
    const { signIn, setUser, signInWithGoogle, setLoading } = useContext(AuthContext);
    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef()
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogle = () => {
        setLoading(true);
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                setUser(user)
                toast.success('Logging Successfully with google')
                navigate('/task');
            })
            .catch(error => {
                toast.error('ERROR', error.message);
            })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log({email, password});
        signIn(email, password)
            .then((result) => {
                // Signed in 
                const user = result.user;
                setUser(user)
                navigate("/task");
                toast.success('Logging Successfully with your Account');
                // ...
            })
            .catch((err) => {
                // setError({ ...error, login: err.code });
                toast.error(`User Login Failed: ${err.code}`);

            });
    }

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <h2 className='text-2xl font-semibold text-center'>Login your Account</h2>
                <form onSubmit={handleSubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input ref={emailRef} name='email' type="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input name='password' type={showPassword ? 'text' : 'password'} placeholder="password" className=" input input-bordered" required />
                        <button onClick={() => { setShowPassword(!showPassword) }} className='btn btn-xs absolute right-4 top-12'>{showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>} </button>
                        {
                            error.login && (
                                <label className='label text-sm text-red-500'>
                                    {error.login}
                                </label>
                            )
                        }

                        <label className="label">
                            <Link to='/forgetPassword' className="label-text-alt link link-hover">Forgot password?</Link>
                        </label>
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn bg-lime-900 text-white">Login</button>
                    </div>
                </form>
                <div className='text-center'>
                    <button onClick={handleGoogle} className="btn">
                        <FaGoogle /> Google Login
                    </button>
                </div> <br />
                <p className='text-center font-semibold'>Dont Have an account? <Link className='text-red-400' to='/register'>register</Link> </p>
            </div>
        </div>

    );
};

export default Login;