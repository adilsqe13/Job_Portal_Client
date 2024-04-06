import React, { useState } from 'react';
import axios from 'axios';
import Spinner from '../icons/Spinner';


export default function EditTaskModal() {

    const apiUrl = process.env.REACT_APP_API_URL;
    const jobId = localStorage.getItem('editJobDetailsId');
    const adminAuthToken = localStorage.getItem('adminAuthToken');
    const [processing, setProcessing] = useState(false);
    const [jobDetails, setJobDetails] = useState('');


    function onChange(event) {
        setJobDetails({ ...jobDetails, [event.target.name]: event.target.value });
    }

    //HANDLE EDIT JOB DETAILS
    async function handleSubmitBtn() {
        setProcessing(true);
        try {
            const response = await axios.put(
                `${apiUrl}/api/jobs/edit-job-details`,
                {
                    jobId,
                    designation:jobDetails.designation,
                    company:jobDetails.company,
                    description:jobDetails.description,
                    location:jobDetails.location,
                    salary:jobDetails.salary
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "auth-token": adminAuthToken
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

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="modal fade" id="editJobModal" tabindex="-1" aria-labelledby="editJobModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 bold" id="editJobModalLabel">EDIT JOB DETAILS</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Designation</label>
                                <input onChange={onChange} type="text" class="form-control" id="exampleFormControlInput1" name="designation" value={jobDetails.designation} />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Description</label>
                                <textarea onChange={onChange} class="form-control" id="exampleFormControlInput1" name="description" value={jobDetails.description} rows={2} />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Company Name</label>
                                <input onChange={onChange} type="text" class="form-control" id="exampleFormControlInput1" name="company" value={jobDetails.company} />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Location</label>
                                <input onChange={onChange} type="text" class="form-control" id="exampleFormControlInput1" name="location" value={jobDetails.location} />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Salary</label>
                                <input onChange={onChange} type="number" class="form-control" id="exampleFormControlInput1" name="salary" value={jobDetails.salary} />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button disabled={jobDetails.designation === '' ||
                                jobDetails.company === '' ||
                                jobDetails.description === '' ||
                                jobDetails.location === '' ||
                                jobDetails.salary === ''
                            } onClick={handleSubmitBtn} type="button" className="btn bg-blue text-dark bold addTaskBtn form-control ">
                                {processing ? <Spinner height={22} width={22} /> : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}