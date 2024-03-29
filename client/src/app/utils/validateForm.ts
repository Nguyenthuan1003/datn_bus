import * as yup from "yup"
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const emailregExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const validateTicket = yup.object().shape({
    phone_number: yup.string().length(10, "Độ dài số điện thoại là 10").matches(phoneRegExp, 'Số điện thoại không đúng định dạng').required('Bạn cần nhập đầy đủ thông tin'),
    name: yup.string().required('bạn cần nhập đầy đủ thông tin'),
    email: yup.string().matches(emailregExp, 'Email không đúng định dạng').required('bạn cần nhập trường email'),
})

export const validateCheckTicket = yup.object().shape({
    phoneNumber: yup.string().length(10, "Độ dài số điện thoại là 10").matches(phoneRegExp, 'Số điện thoại không đúng định dạng').required('Bạn cần nhập đầy đủ thông tin'),
    ticket: yup.string().required('bạn cần nhập đầy đủ thông tin')
})

export const validateLogin = yup.object().shape({
    email: yup.string().email('Email không hợp lệ').matches(emailregExp, 'Email không đúng định dạng').required('bạn cần nhập đầy đủ thông tin'),
    password: yup.string().required('bạn cần nhập đầy đủ thông tin')
})

export const validateRegister = yup.object().shape({
    phone_number: yup.string().length(10, "Độ dài số điện thoại là 10").matches(phoneRegExp, 'Số điện thoại không đúng định dạng').required('cần nhập đầy đủ thông tin'),
    email: yup.string().email('Email không hợp lệ').matches(emailregExp, 'Email không đúng định dạng').required('cần nhập đầy đủ thông tin'),
    password: yup.string().min(8, 'Mật khẩu phải có ít nhất 8 kí tự').required('cần nhập đầy đủ thông tin'),
    comfirmPassWord: yup.string().oneOf([yup.ref("password")], 'mật khẩu xác nhận phải trùng với mật khẩu bắt buộc').required('cần nhập đầy đủ thông tin'),
});


export const validateForgot = yup.object().shape({
    email: yup.string().email('Email không hợp lệ').matches(emailregExp, 'Email không đúng định dạng').required('cần nhập đầy đủ thông tin'),
})