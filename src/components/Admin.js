import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './icons/Spinner';
import AddOpenings from './modals/AddOpenings';
import EditJobDetails from './modals/EditJobDetails';

export default function Homepage() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const adminAuthToken = localStorage.getItem('adminAuthToken');
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

    async function handleEdit(jobId) {
        localStorage.setItem('editJobDetailsId', jobId);
    }

    async function handleDelete(jobId) {
        setProcessing(true);
        try {
            const response = await fetch(`${apiUrl}/api/jobs/delete-job/${jobId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": adminAuthToken
                },
            });
            const json = await response.json();
            if (json.success) {
                window.location.reload();
                setProcessing(false);
            } else {
                alert('Something went wrong');
                setProcessing(false);
            }
        } catch (error) {
            setProcessing(false);
            console.log(error);
            alert('Something went wrong');
        }

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
        <AddOpenings />
        <EditJobDetails />
            <section style={{ backgroundColor: "#ffffff" }}>
                <div className="container py-5">
                    <h1 className='mt-3'>Listed Openings <small className='h6 text-secondary'>&nbsp; &nbsp; {jobs === null ? 0 : jobs.length} - post</small></h1>
                    <div className="row p-2">
                        <div className="col-sm-9"></div>
                        <div className="col-sm-3 dfjeat addTaskbtn-div">
                            <button type="button" className="btn bg-danger text-light bold addTaskBtn" data-bs-toggle="modal" data-bs-target="#addJobModal">
                                Add Job
                            </button>
                        </div>
                    </div>
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
                                                    <p>{item.description}</p>
                                                    <div className="row">
                                                        <div className="col-3 text-secondary bold dfjeac">Location: </div>
                                                        <div className="col-3 dfjsac"><span>{item.location}</span></div>
                                                        <div className="col-3 text-secondary bold dfjeac">Salary: </div>
                                                        <div className="col-3 dfjsac"><strong>{item.salary}</strong>/month</div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-6 dfjcac">
                                                    <button onClick={() => { handleEdit(item._id) }} className="btn btn-info w-50 btn-sm mt-2 bold fs-5 rounded" type="button" data-bs-toggle="modal" data-bs-target="#editJobModal">
                                                        Edit
                                                    </button>
                                                </div>
                                                <div className="col-6 dfjcac">
                                                    <button onClick={() => { handleDelete(item._id) }} className="btn btn-danger w-50 btn-sm mt-2 bold fs-5 rounded" type="button">
                                                        {processing === true ? <Spinner height='30' width='30' /> : 'Delete'}
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
