import * as Yup from "yup";

export const subjectschema = Yup.object({
    subname:Yup.string().required('Subject name is required'),
    subcode:Yup.string().required('Subject code is required')
})