import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const adminAuthToken = localStorage.getItem('adminAuthToken');

    function handleLogout() {
        localStorage.removeItem('adminAuthToken');
        navigate('/login');
    }
    return (
        <>
            <nav className="container-fluid navbar navbar-expand-lg  px-2 py-3 bg-dark min-width-370">
                <div className="container-fluid">
                    <a className="navbar-brand bold fs-2 text-light" href="#"><span className='text-red'>Job</span>Portal</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="bg-light navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto px-5 mb-2 mb-lg-0">
                            <li className="nav-item p-2 dfjcac">
                                <a className="nav-link bold fs-5 text-light" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item p-2 dfjcac">
                                <a className="nav-link bold fs-5 text-light" aria-current="page" href="/admin">Admin</a>
                            </li>
                            {adminAuthToken && <li className="nav-item p-2 dfjcac">
                                <a onClick={handleLogout} className="nav-link bold fs-5 text-light" aria-current="page" href="/login"><span className='text-danger'>Logout</span></a>
                            </li>}
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-danger" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}