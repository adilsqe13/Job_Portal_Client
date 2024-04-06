import React from 'react';


export default function AddOpenings(props) {

    function handleApplyNow() {
        alert('Applied');
        window.location.reload();
    }

    return (
        <>
            <div className="modal fade" id="jobDetailsModal" tabindex="-1" aria-labelledby="jobDetailsModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 bold" id="jobDetailsModalLabel">JOB DETAILS</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="card box-shadow-light rounded-3 border-0">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12 col-lg-12 col-xl-12">
                                                <p><span className='bold h5'>{props.job.designation}</span>&nbsp;<span className='fs-6'> ID: 66666</span></p>
                                                <p className='text-secondary'>{props.job.company}</p>
                                                <p>{props.job.description}</p>
                                                <div className="row">
                                                    <div className="col-3 text-secondary bold">Salary: </div>
                                                    <div className="col-9 dfjsac"><strong>{props.job.salary}</strong>/month</div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleApplyNow} type="button" className="btn bg-blue text-danger bold addTaskBtn form-control ">
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}