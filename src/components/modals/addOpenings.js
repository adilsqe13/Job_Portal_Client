import React, { useState } from 'react';
import axios from 'axios';
import Spinner from '../icons/Spinner';


export default function AddOpenings() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const jobObject = {
        designation: '', 
        description: '', 
        company: '', 
        location: '', 
        salary: '' 
    }
    const [processing, setProcessing] = useState(false);
    const [job, setJob] = useState(jobObject);

    function onChange(event) {
        setJob({ ...job, [event.target.name]: event.target.value });
    }

    //HANDLE ADD OPENINGS
    async function handleAddOpenings() {
        setProcessing(true);
        try {
            const response = await axios.post(
                `${apiUrl}/api/jobs/add-openings`,
                {
                    ...job
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            );
            if (response.data.success) {
                setProcessing(false);
                window.location.reload();
            } else {
                setProcessing(false);
                alert('Something went wrong');
            }
            
            setJob(jobObject);

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="modal fade" id="addJobModal" tabindex="-1" aria-labelledby="addJobModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 bold" id="addJobModalLabel">CREATE A JOB</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Designation</label>
                                <input onChange={onChange} type="text" class="form-control" id="exampleFormControlInput1" name="designation" value={job.designation} />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Description</label>
                                <textarea onChange={onChange}  class="form-control" id="exampleFormControlInput1" name="description" value={job.description} rows={2} />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Company Name</label>
                                <input onChange={onChange} type="text" class="form-control" id="exampleFormControlInput1" name="company" value={job.company} />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Location</label>
                                <input onChange={onChange} type="text" class="form-control" id="exampleFormControlInput1" name="location" value={job.location} />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Salary</label>
                                <input onChange={onChange} type="number" class="form-control" id="exampleFormControlInput1" name="salary" value={job.salary} />
                            </div>
                            
                        </div>
                        <div className="modal-footer">
                            <button disabled={job.designation === '' ||
                                job.description === '' ||
                                job.company === '' ||
                                job.location === '' ||
                                job.salary === ''
                             
                            } onClick={handleAddOpenings} type="button" className="btn bg-blue text-dark bold addTaskBtn form-control ">
                                {processing ? <Spinner height={22} width={22} /> : "ADD JOB"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}