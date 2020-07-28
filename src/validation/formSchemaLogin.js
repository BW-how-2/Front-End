import * as yup from 'yup'

const formSchemaLogin = yup.object().shape({
    username: yup
        .string()
        .min(5, "Please add your username")
        .required("Username is required"),
    password: yup
        .string()
        .min(5, "Please add your password")
        .required("Password is required")
})

export default formSchemaLogin