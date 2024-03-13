import { axiosFormData } from "../confighHTTp"


export const register=async(data:any)=>{
    return await axiosFormData.post("register",data)
}
export const login=async(data:any)=>{
    return await axiosFormData.post("login",data)
}
// export const profileUser = async (token: string) => {
//     try {
//         const response = await axiosFormData.post("me", null, {
//             headers: {
//                 Authorization: `Bearer ${token}` // Thêm token vào header của yêu cầu
//             }
//         });
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };