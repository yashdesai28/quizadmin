import * as Yup from "yup";

export const subjectschema = Yup.object({
    emails:Yup.string().required('Emails is required'),
    subject:Yup.string().required('subject select is required')
})