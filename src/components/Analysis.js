import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from 'axios';

function Analysis() {

    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([]);

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([

        { headerName: "Student Name", field: "student_name", filter: true, floatingFilter: true },
        { headerName: "Student Email", field: "student_email", filter: true, floatingFilter: true },
        { headerName: "Enrollment Number", field: "eno", filter: true, floatingFilter: true },
        { headerName: "Subject Name", field: "subject", filter: true, floatingFilter: true },
        { headerName: "Quiz Name", field: "quiz_name", filter: true, floatingFilter: true },
        { headerName: "Date", field: "date", filter: true, floatingFilter: true },
        { headerName: "total marks", field: "total_marks", filter: true, floatingFilter: true },
        { headerName: "passing mark", field: "passing_marks", filter: true, floatingFilter: true },
        { headerName: "OBTAIN MARKS", field: "OBTAIN_MARKS", filter: true, floatingFilter: true }
    ]);

    useEffect(() => {
        // Make API call to fetch data
        const id = localStorage.getItem('Teacherid');
        axios.post('http://localhost:8080/stresult', {
            id: id
        }).then(response => {
            // Check if the response status is OK (200)
            if (response.status === 200) {

                const rowData = response.data.data.map(item => {
                    const studentInfo = {
                        student_name: item.student_id.student_name,
                        student_email: item.student_id.student_email,
                        eno: item.student_id.student_enrollment_number
                    };

                    const assessmentInfo = item.assessment_data.map(assessment => ({
                        student_name: studentInfo.student_name,
                        student_email: studentInfo.student_email,
                        eno: studentInfo.eno,
                        subject: assessment.subject_id.subject_name,
                        quiz_name: assessment.quiz_id.quiz_name,
                        total_marks: assessment.quiz_id.total_marks,
                        passing_marks: assessment.quiz_id.passing_marks,
                        date: assessment.date,
                        OBTAIN_MARKS: assessment.total
                    }));

                    return assessmentInfo;
                }).flat(); // Flatten the array of assessment objects

                console.log(rowData);
                setRowData(rowData)



            } else {
                // Handle non-OK response status
                console.error('Error: Non-OK response status:', response.status);
            }
        })
            .catch(error => {
                // Handle error
                console.error('Error fetching data:', error);
            });

    }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

    return (
        <div className="container">
            <div
                className="ag-theme-quartz-dark own"  // applying the grid theme
                style={{ height: 500, marginTop: '4rem' }} // the grid will fill the size of the parent container
            >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                />
            </div>
        </div>
    )
}

export default Analysis