import { axiosFormData, axiosPrivate } from "../confighHTTp"


export const register=async(data:any)=>{
    return await axiosFormData.post("register",data)
}
export const login=async(data:any)=>{
    return await axiosFormData.post("login",data)
}
export const getOneUser = async (token: string) => {
    try {
      const response = await axiosPrivate.post('me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error in getOneUser API:', error);
      throw error;
    }
  };
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