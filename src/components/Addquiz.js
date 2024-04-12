import React from 'react'
import { useEffect, useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom';
import { subjectschema } from '../schema/addquiz'
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { TextField, Button } from '@mui/material';
import dayjs from 'dayjs';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";

import axios from 'axios'

const ProSpan = styled('span')({
    display: 'inline-block',
    height: '1em',
    width: '1em',
    verticalAlign: 'middle',
    marginLeft: '0.3em',
    marginBottom: '0.08em',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'url(https://mui.com/static/x/pro.svg)',
});

function Label({ componentName, valueType, isProOnly }) {
    const content = (
        <span>
            <strong>{componentName}</strong> for {valueType} editing
        </span>
    );

    if (isProOnly) {
        return (
            <Stack direction="row" spacing={0.5} component="span">
                <Tooltip title="Included on Pro package">
                    <a
                        href="https://mui.com/x/introduction/licensing/#pro-plan"
                        aria-label="Included on Pro package"
                    >
                        <ProSpan />
                    </a>
                </Tooltip>
                {content}
            </Stack>
        );
    }

    return content;
}


const Addquiz = () => {

    const [rowData, setRowData] = useState([

    ]);
    const ButtonRenderer = ({ value }) => {
        return (
            <Button variant="contained" onClick={() => handleButtonClick(value)}>
                Click me
            </Button>
        );
    };

    // Function to handle button click
    const handleButtonClick = (rowData) => {
        console.log("Button clicked for row:", rowData);
        // Add your logic here to handle the button click for a specific row
    };

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
        { field: "subject_name", filter: true, floatingFilter: true },
        { field: "id", filter: true, floatingFilter: true },
        { field: "quiz_name", filter: true, floatingFilter: true, minWidth: 70, },
        { field: "start_time", filter: true, floatingFilter: true },
        { field: "end_time", filter: true, floatingFilter: true },
        { field: "secure_url_cvs", editable: true, },
        {
            headerName: 'Action',
            field: 'fieldName',
            cellRenderer: function (params) {
                const handleButtonClick = () => {
                    console.log('Button clicked for row:', params.data.id);

                    axios.post('http://localhost:8080/dquiz', {
                        quizId: params.data.id

                    }).then((res) => {

                        console.log("success");
                        console.log("success")
                        lod();


                    }).catch((error) => {


                        console.log("error", error, "this is actch");


                    });



                };

                return (
                    <div>
                        <button onClick={handleButtonClick} style={{ backgroundColor: 'transparent', width: '1.7rem', border: 'none' }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                        </button>
                    </div>
                );
            }
        }
    ]);



    const tid = localStorage.getItem('Teacherid');

    const [subject, setsubject] = useState([]);
    console.log('subject', subject);

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(subjectschema),
        defaultValues: { subject: '', name: '', tmarks: '', pmarks: '', selectedDate: '', selectedDateend: '', file: '' }
    });

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateend, setSelectedDateend] = useState(null);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);

        console.log("===", selectedDate);
    };
    const handleDateChange1 = (newDate) => {
        setSelectedDateend(newDate);

        console.log("===", selectedDate);
    };


    const onSubmit = async (data) => {

        const formattedDate = dayjs(selectedDate).format('DD/MM/YYYY hh:mm A');
        console.log('start date:', formattedDate);

        const formattedDateend = dayjs(selectedDateend).format('DD/MM/YYYY hh:mm A');
        console.log('end date:', formattedDateend);


        console.log("==", data.file[0]);

        let tid = localStorage.getItem('Teacherid');

        // // const dataArray = data.emails.split('\n'); // Split textarea value by newline
        // // console.log(dataArray);
        await axios.post('http://localhost:8080/basicfile', {
            file: data.file[0],
            name: data.name,
            subid: data.subject,
            tmarks: data.tmarks,
            pmarks: data.pmarks,
            tid: tid,
            startt: formattedDate,
            endt: formattedDateend
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(async (res) => {


            await console.log(res.data);

            // setsubject(res.data)


        }).catch((error) => {
            console.log("error", error, "this is actch");



        });

        lod();


    };

    const showicon = {
        display: 'flex',
        flexDirection: 'row',
        height: '1rem',
        color: 'red'
    }

    const mar = {
        margin: '1rem'
    }

    async function lod() {

        console.log('lod function');

        await axios.post('http://localhost:8080/showsubjectteacher', {
            id: tid
        }).then((res) => {

            console.log(res.data);
            setsubject(res.data)

        }).catch((error) => {
            console.log("error", error, "this is actch");
        });


        axios.post('http://localhost:8080/showlistallquiz', {
            id: tid,

        }).then((res) => {


            console.log(res.data);



            const rowData = res.data.flatMap(item => item.Quizzes.map(quiz => ({
                quiz_name: quiz.quiz_name,
                start_time: quiz.start_time,
                end_time: quiz.end_time,
                subject_name: item.subject_name,
                secure_url_cvs: quiz.secure_url_cvs,
                id: quiz._id
            })));

            setRowData(rowData)





        }).catch((error) => {
            console.log("error", error, "this is actch");



        });

    }


    useEffect(() => {


        axios.post('http://localhost:8080/showsubjectteacher', {
            id: tid
        }).then((res) => {

            console.log(res.data);
            setsubject(res.data)

        }).catch((error) => {
            console.log("error", error, "this is actch");
        });


        axios.post('http://localhost:8080/showlistallquiz', {
            id: tid,

        }).then((res) => {


            console.log(res.data);



            const rowData = res.data.flatMap(item => item.Quizzes.map(quiz => ({
                quiz_name: quiz.quiz_name,
                start_time: quiz.start_time,
                end_time: quiz.end_time,
                subject_name: item.subject_name,
                secure_url_cvs: quiz.secure_url_cvs,
                id: quiz._id
            })));

            setRowData(rowData)





        }).catch((error) => {
            console.log("error", error, "this is actch");



        });


        return () => {

        }



    }, [])

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
                                                            <option key={subject._id} value={subject._id}>{subject.
                                                                subject_name}</option>

                                                        </>
                                                    })}

                                                </select>
                                                <div className='relerror'>{errors.subject && (<div className='relerror' style={mar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className='erroricon' style={showicon}>
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                                </svg><p className='showerror'>{errors.subject.message}</p></div>)}</div>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                    Quiz name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    {...register('name')}
                                                />
                                                <div className='relerror'>{errors.name && (<div className='relerror' style={mar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className='erroricon' style={showicon}>
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                                </svg><p className='showerror'>{errors.name.message}</p></div>)}</div>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                    Total Marks
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    {...register('tmarks')}
                                                />
                                                <div className='relerror'>{errors.tmarks && (<div className='relerror' style={mar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className='erroricon' style={showicon}>
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                                </svg><p className='showerror'>{errors.tmarks.message}</p></div>)}</div>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                    Passing Marks
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    {...register('pmarks')}
                                                />
                                                <div className='relerror'>{errors.pmarks && (<div className='relerror' style={mar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className='erroricon' style={showicon}>
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                                </svg><p className='showerror'>{errors.pmarks.message}</p></div>)}</div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Select CSV file (less than 1MB)</label>
                                                <Controller
                                                    name="file"
                                                    control={control}
                                                    defaultValue={null}
                                                    rules={{
                                                        required: 'File is required',
                                                        validate: {
                                                            fileSize: (value) => value[0].size < 1048576 || "File size should be less than 1MB",
                                                            fileType: (value) => value[0].type === 'text/csv' || "Only CSV files are allowed"
                                                        }
                                                    }}
                                                    render={({ field }) => (
                                                        <div>
                                                            <input
                                                                type="file"
                                                                onChange={(e) => field.onChange(e.target.files)}
                                                            />
                                                            {errors.file && <p>{errors.file.message}</p>}
                                                        </div>
                                                    )}
                                                />
                                            </div>
                                            {/* <div className='relerror'>{errors.emails && (<div className='relerror' style={mar}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className='erroricon' style={showicon}>
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                            </svg><p className='showerror'>{errors.emails.message}</p></div>)}</div> */}
                                            <div className="mb-3">
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <Controller // Use Controller to wrap DateTimePicker
                                                        control={control}
                                                        name="selectedDate"
                                                        rules={{ required: 'Date and time selection is required' }}
                                                        render={({ field }) => (
                                                            <DateTimePicker className="form-select1"
                                                                label="Select Start Date and Time"
                                                                value={selectedDate}
                                                                onChange={(date) => {
                                                                    handleDateChange(date);
                                                                    field.onChange(date);
                                                                }}
                                                                renderInput={(props) => <TextField {...props} error={Boolean(errors.selectedDate)} />}
                                                            />
                                                        )}
                                                    />
                                                </LocalizationProvider>
                                                {errors.selectedDate && <span>{errors.selectedDate.message}</span>} {/* Show error message if validation fails */}
                                                <p>Selected date and time: {selectedDate ? dayjs(selectedDate).format('DD/MM/YYYY hh:mm A') : 'None'}</p>
                                            </div>

                                            <div className="mb-3">
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <Controller  // Use Controller to wrap DateTimePicker
                                                        control={control}
                                                        name="selectedDateend"
                                                        rules={{ required: 'Date and time selection is required' }}
                                                        render={({ field }) => (
                                                            <DateTimePicker className="form-select1"
                                                                label="Select End Date and Time"
                                                                value={selectedDateend}
                                                                onChange={(date) => {
                                                                    handleDateChange1(date);
                                                                    field.onChange(date);
                                                                }}
                                                                renderInput={(props) => <TextField {...props} error={Boolean(errors.selectedDateend)} />}
                                                            />
                                                        )}
                                                    />
                                                </LocalizationProvider>
                                                {errors.selectedDateend && <span>{errors.selectedDateend.message}</span>} {/* Show error message if validation fails */}
                                                <p>Selected date and time: {selectedDateend ? dayjs(selectedDateend).format('DD/MM/YYYY hh:mm A') : 'None'}</p>
                                            </div>

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

export default Addquiz