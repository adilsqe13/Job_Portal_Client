import React, { useState, useEffect } from 'react';
import Spinner from './icons/Spinner';
import ShowDetails from './modals/ShowDetails';

export default function Homepage() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [jobs, setJobs] = useState([]);
    const [jobDetails, setJobDetails] = useState([]);

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

    function handleApply() {
        alert('Applied');
    }
    async function handleShowDetails(jobId) {
        try {
            const jobDetails = await jobs.find(el => el._id === jobId);
            setJobDetails(jobDetails);
        } catch (error) {
            console.log(error);
            alert('Something went wrong');
        }
    }

    useEffect(() => {
        getAllOpenings();
    }, []);

    return (
        <>
            <ShowDetails job={jobDetails} />
            <section style={{ backgroundColor: "#ffffff" }}>
                <div className="container py-5">
                    <h1 className='mt-3'>Job Openings <small className='h6 text-secondary'>&nbsp; &nbsp; {jobs === null ? 0 : jobs.length} - post</small></h1>
                    <div className="row justify-content-center mb-3 mt-4">

                        <h5 className='text-danger text-align-center dfjcac'>{jobs === null ? '' : jobs.length === 0 ? 'No Openings' : ''}</h5>
                        {jobs === null ? <Spinner height='70' width='70' /> : jobs.map((item, index) => {
                            return (
                                <div key={index} className="col-md-12 col-xl-12 p-0 mt-2">
                                    <div className="card box-shadow-light rounded-3 border-0">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-6 col-lg-6 col-xl-6">
                                                    <p><span className='bold h5'>{item.designation}</span>&nbsp;<span className='fs-6'> ID: {item._id.substring(16, 22).toUpperCase()}</span></p>

                                                    <div className="row">
                                                        <div className="col-3 text-secondary bold">Company: </div>
                                                        <div className="col-3 dfjsac"><span>{item.company}</span></div>
                                                        <div className="col-3"></div>
                                                        <div className="col-3"></div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-3 text-secondary bold">Location: </div>
                                                        <div className="col-3 dfjsac"><span>{item.location}</span></div>
                                                        <div className="col-3 text-secondary bold dfjeac">Salary: </div>
                                                        <div className="col-3 dfjsac"><strong>{item.salary}</strong>/month</div>
                                                    </div>

                                                </div>
                                                <div className="col-md-6 col-lg-6 col-xl-6 border-sm-start-none border-start">
                                                    <div className="row">
                                                        <div className="col dfjcac">
                                                            <button onClick={() => { handleApply(item._id) }} className="btn btn-outline-danger w-50 btn-sm mt-2 bold fs-5 rounded" type="button">
                                                                Apply Now
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col dfjcac">
                                                            <button onClick={() => { handleShowDetails(item._id) }} className="btn btn-outline-primary w-50 btn-sm mt-2 bold fs-5 rounded" type="button" data-bs-toggle="modal" data-bs-target="#jobDetailsModal">
                                                                Show Details
                                                            </button>
                                                        </div>
                                                    </div>
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
