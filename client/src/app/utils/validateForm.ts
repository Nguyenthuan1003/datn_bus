import * as yup from "yup"
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const validateTicket = yup.object().shape({
    phoneNumber: yup.string().length(10, "Độ dài số điện thoại là 10").matches(phoneRegExp, 'Số điện thoại không đúng định dạng').required('Bạn cần nhập đầy đủ thông tin'),
    ticket: yup.string().required('bạn cần nhập đầy đủ thông tin'),
})

export const validateLogin = yup.object().shape({
    email: yup.string().email('Email không hợp lệ').required('bạn cần nhập đầy đủ thông tin'),
    password: yup.string().required('bạn cần nhập đầy đủ thông tin')
})

export const validateRegister = yup.object().shape({
    first_name: yup.string().required('cần nhập đầy đủ thông tin'),
    last_name: yup.string().required('cần nhập đầy đủ thông tin'),
    phoneNumber: yup.string().length(10, "Độ dài số điện thoại là 10").matches(phoneRegExp, 'Số điện thoại không đúng định dạng').required('cần nhập đầy đủ thông tin'),
    email: yup.string().email('Email không hợp lệ').required('cần nhập đầy đủ thông tin'),
    password: yup.string().required('cần nhập đầy đủ thông tin')
})