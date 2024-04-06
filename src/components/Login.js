import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/form.css';
import Spinner from './icons/Spinner';

export default function AdminLogin() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [adminCredentials, setAdminCredentials] = useState({ email: '', password: '' });
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const response = await fetch(`${apiUrl}/api/auth/admin/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: adminCredentials.email, password: adminCredentials.password })
        });

        try {
            const json = await response.json();
            setProcessing(false);
            if (json.success) {
                localStorage.setItem('adminAuthToken', json.authToken);
                navigate('/admin');
            } else {
                alert('Something went wrong');
                navigate('/login');
                window.scrollTo(0, 0);
            }
        } catch (error) {
            console.log(error);
            alert('Network Error: Something went wrong');
        }

    }
    const onChange = (e) => {
        setAdminCredentials({ ...adminCredentials, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (localStorage.getItem('adminAuthToken')) {
            navigate('/admin');
        } else {
            navigate('/login');
        }
    }, []);

    return (
        <>
            <div className="container py-4 box-middle">
                <div className="row">
                    <h6 className='dfjcac'><strong>Email:</strong>&nbsp;admin@gmail.com &nbsp; &nbsp;<strong>Password:</strong>&nbsp;admin123</h6>
                    <div className=" col-lg-3 col-sm-0"></div>
                    <div className=" col-lg-6 col-sm-12 mini-container">
                        <h1>Admin Login</h1>
                        <form className='form-group mt-4'>
                            <label className=' fs-4 mt-1' >Email</label>
                            <input type='email' onChange={onChange} value={adminCredentials.email} name='email' autoComplete="username" className='form-control input-field fs-5' />
                            <label className=' fs-4 mt-1 ' >Password</label>
                            <input type='password' onChange={onChange} value={adminCredentials.password} name='password' autoComplete="password" className='form-control input-field fs-5' />
                            <button onClick={handleLogin} className='btn btn-dark form-control mt-1 fs-4 bold  '>
                                {processing === true ? <Spinner height='30' width='30' /> : 'Login'}
                            </button>
                        </form>
                    </div>
                    <div className=" col-lg-3 col-sm-0"></div>
                </div>
            </div>
        </>
    )
}