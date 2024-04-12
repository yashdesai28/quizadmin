import * as Yup from "yup";

export const subjectschema = Yup.object({
    subject: Yup.string().required('Subject is required'),
    name: Yup.string().required('quiz name is required'),
    file: Yup.mixed().required('File is required').test('fileSize', 'File size should be less than 1MB', (value) => value && value[0].size < 1048576).test('fileType', 'Only CSV files are allowed', (value) => value && value[0].type === 'text/csv'),
    selectedDate: Yup.date().required('Start Date and Time is required'),
    selectedDateend: Yup.date().required('End Date and Time is required'),
    tmarks: Yup.number().typeError('Total marks must be a number').required('Total marks is required').positive('Total marks must be a positive number'),
    pmarks: Yup.number().typeError('Passing marks must be a number').required('Passing marks is required').positive('Passing marks must be a positive number')
})