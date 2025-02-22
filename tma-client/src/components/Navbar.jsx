import React, { useContext } from 'react';
import { Link, Links, NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const Navbar = () => {
    const { user, logOut, toggleTheme } = useContext(AuthContext);
    const links = <>
        
    
        {
            user? <li><NavLink to='/task' >Task</NavLink></li>:<li><NavLink to="/">Home</NavLink></li>
        }

        {
            user && <li><NavLink to='/AddTask' >Add Task</NavLink></li>
        }
       
     

    </>
    return (
        <div className="navbar text-white  max-w-screen mx-auto  bg-neutral-600 h-10 px-8">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1000] p-2 shadow absolute top-full left-0">
                        {links}
                    </ul>
                </div>
                <Link to='/task' className="btn btn-ghost text-xl hover:bg-neutral-800 hover:text-white rounded-none">TASK</Link>
            </div>
            <div className="navbar-center hidden lg:flex">

                <ul className="hidden md:flex gap-6">
                    {links}
                </ul>
            </div>
            {/* text */}


            {/* text */}

            <div className="navbar-end">
                {
                    user && user?.email ?
                        <div className='flex gap-3'>
                            <div className="dropdown dropdown-hover">
                                <div tabIndex={0} role="button" className=" m-1">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={user && user?.photoURL} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow">
                                    <li className='text-black'>{user && user?.displayName}</li>

                                </ul>
                            </div>
                            <div className='flex items-center'><button className='btn'><a onClick={logOut}>Logout</a></button> </div>
                        </div>

                        : <Link to='/' className="btn bg-gray-500 text-white rounded-none">Login</Link>
                }
                {/* {
                    user && user?.email ? <button onClick={logOut} className="btn btn-neutral rounded-none">logout</button> : <Link to='/auth/login' className="btn btn-neutral rounded-none">Login</Link>
                } */}

                {/* <Link to='/auth/login' className="btn btn-neutral rounded-none">Login</Link> */}
            </div>
            <div className="flex justify-end ml-3">
                {/* lll */}
                <input type="checkbox" onClick={toggleTheme} value="synthwave" className="toggle theme-controller" />
                {/* lll */}
            </div>
        </div>
    );
};

export default Navbar;