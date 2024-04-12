import React from 'react'
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom';
import { subjectschema } from '../schema/sendsub'
import axios from 'axios'
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";


const Sendsubject = () => {

    const tid = localStorage.getItem('Teacherid');
    const [rowData, setRowData] = useState([

    ]);

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
        { field: "student_email", filter: true, floatingFilter: true },
        { field: "subject", filter: true, floatingFilter: true },
        { field: "role", filter: true, floatingFilter: true },
        { field: "status", filter: true, floatingFilter: true },
        { field: "date_time", filter: true, floatingFilter: true },
        { field: "Last_activity", filter: true, floatingFilter: true },
        {
            headerName: 'Action',
            field: 'fieldName',
            cellRenderer: function (params) {
                const handleButtonClick = () => {
                    console.log('Button clicked for row:', params.data);


                    console.log(params.data.student_email, params.data.subject, tid);

                    axios.post('http://localhost:8080/sendsubjecttoken', {
                        teacherid: tid,
                        name: params.data.subject,
                        emails: params.data.student_email
                    }).then((res) => {


                        console.log(res.data);
                        // setsubject(res.data)


                    }).catch((error) => {
                        console.log("error", error, "this is actch");



                    });




                };

                return (
                    <div>
                        <button onClick={handleButtonClick} style={{ backgroundColor: 'transparent', width: '1.6rem', border: 'none' }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>

                        </button>
                    </div>
                );
            }
        }

    ]);
    const [subject, setsubject] = useState([]);
    console.log('subject', subject);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(subjectschema),
        defaultValues: { subject: '', emails: '' }
    });
    const onSubmit = data => {
        console.log(data);
        // const dataArray = data.emails.split('\n'); // Split textarea value by newline
        // console.log(dataArray);
        axios.post('http://localhost:8080/sendsubjecttoken', {
            teacherid: tid,
            name: data.subject,
            emails: data.emails
        }).then((res) => {


            console.log(res.data);
            // setsubject(res.data)






        }).catch((error) => {
            console.log("error", error, "this is actch");



        });


    };
    useEffect(() => {

        axios.post('http://localhost:8080/showsubjectteacher', {
            id: tid
        }).then((res) => {


            console.log(res.data);
            setsubject(res.data)






        }).catch((error) => {
            console.log("error", error, "this is actch");



        });


        axios.post('http://localhost:8080/shownotification', {
            id: tid,

        }).then((res) => {


            console.log(res.data);

            // const rowData = res.data.map(item => item.subject
            //     .map(quiz => ({
            //     student_email: item.student_email,
            //     role: item.role,
            //     status: item.status,
            //     date_time: item.date_time,
            //     Last_activity: item.Last_activity,
            // })));


            const rowData = res.data.map(item => ({
                student_email: item.student_email,
                role: item.role,
                status: item.status,
                date_time: item.date_time,
                Last_activity: item.Last_activity,
                subject: item.subject.subject_name
            })

            )

            setRowData(rowData)

            // setRowData(res.data)





        }).catch((error) => {
            console.log("error", error, "this is actch");



        });



        return () => {

        }

    }, [])

    const showicon = {
        display: 'flex',
        flexDirection: 'row',
        height: '1rem',
        color: 'red'
    }
    const mar = {
        margin: '0.1rem'
    }


    return (
        <>
            {/*  Header End */}
            <div className="container-fluid">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title fw-semibold mb-4">Forms</h5>
                            <div className="card mb-0">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <fieldset>
                                            <div className="mb-3">
                                                <label className="form-label">select subject</label>
                                                <select id="disabledSelect" className="form-select" name='subject' {...register('subject')}>
                                                    <option>-------select subject------</option>
                                                    {subject.map((subject, index, arr) => {
                                                        return <>
                                                            <option key={subject._id} value={subject.subject_name}>{subject.
                                                                subject_name}</option>

                                                        </>
                                                    })}

                                                </select>
                                                <div className='relerror'>{errors.subject && (<div className='relerror' style={mar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className='erroricon' style={showicon}>
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                                </svg><p className='showerror'>{errors.subject.message}</p></div>)}</div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Enter email address </label>
                                                <textarea id="disabledSelect" rows={20}
                                                    cols={50} className="form-select1" name='emails'  {...register('emails')} />
                                            </div>
                                            <div className='relerror'>{errors.emails && (<div className='relerror' style={mar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className='erroricon' style={showicon}>
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                            </svg><p className='showerror'>{errors.emails.message}</p></div>)}</div>
                                            <div className="mb-3">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="disabledFieldsetCheck"
                                                        disabled=""
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="disabledFieldsetCheck"
                                                    >
                                                        Can't check this
                                                    </label>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary">
                                                Submit
                                            </button>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div
                            className="ag-theme-quartz-dark" // applying the grid theme
                            style={{ height: 500 }} // the grid will fill the size of the parent container
                        >
                            <AgGridReact
                                rowData={rowData}
                                columnDefs={colDefs}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Sendsubject