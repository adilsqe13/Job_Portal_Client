import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './icons/Spinner';

export default function Homepage() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [processing, setProcessing] = useState(false);

    const getAllOpenings = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/jobs/get-all-openings`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const json = await response.json();
            setJobs(json.jobs.reverse());
        } catch (error) {
            console.log(error);

        }
    }

    function handleEdit() {

    }
    function handleDelete() {

    }

    useEffect(() => {
        if (localStorage.getItem('adminAuthToken')) {
            getAllOpenings();
        } else {
            navigate('/login');
        }
    }, []);

    return (
        <>
            <section style={{ backgroundColor: "#ffffff" }}>
                <div className="container py-5">
                    <h1 className='mt-3'>Listed Openings <small className='h6 text-secondary'>&nbsp; &nbsp; {jobs === null ? 0 : jobs.length} - post</small></h1>
                    <div className="row justify-content-center mb-3 mt-4">

                        <h5 className='text-danger text-align-center dfjcac'>{jobs === null ? '' : jobs.length === 0 ? 'No Openings' : ''}</h5>
                        {jobs === null ? <Spinner height='70' width='70' /> : jobs.map((item, index) => {
                            return (
                                <div key={index} className="col-md-12 col-xl-12 p-0 mt-2">
                                    <div className="card box-shadow-light rounded-3 border-0">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-12 col-lg-12 col-xl-12">
                                                    <p><span className='bold h5'>{item.designation}</span>&nbsp;<span className='fs-6'> ID: {item._id.substring(16, 22).toUpperCase()}</span></p>
                                                    <p className='text-secondary'>{item.company}</p>
                                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia quia illum tenetur. Quod earum harum mollitia praesentium cupiditate laudantium et facere explicabo blanditiis. Fuga, consequatur placeat dolore animi doloremque similique saepe architecto sapiente ex, provident quidem odio voluptas quae quisquam tenetur magni. Corporis modi illo saepe labore corrupti. Mollitia, tempore cupiditate corporis repudiandae porro, temporibus omnis obcaecati eius recusandae beatae ex. Ratione quo corporis ipsa quibusdam, nisi, odit recusandae dolorum error corrupti distinctio natus voluptates illum aliquid excepturi nihil nobis quis vel est fugit aperiam voluptate magnam unde debitis culpa. Tenetur in aliquid odit voluptatum maxime hic odio consectetur vero?</p>
                                                    <div className="row">
                                                        <div className="col-3 text-secondary bold">Salary: </div>
                                                        <div className="col-9 dfjsac"><strong>{item.salary}</strong>/month</div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-6 dfjcac">
                                                    <button onClick={() => { handleEdit(item._id) }} className="btn btn-outline-info w-50 btn-sm mt-2 bold fs-5 rounded" type="button">
                                                        Edit
                                                    </button>
                                                </div>
                                                <div className="col-6 dfjcac">
                                                    <button onClick={() => { handleDelete(item._id) }} className="btn btn-outline-danger w-50 btn-sm mt-2 bold fs-5 rounded" type="button">
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
