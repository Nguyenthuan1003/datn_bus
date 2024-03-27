import { axiosPrivate } from "../confighHTTp"

export const addBill = async (data: any) => {
    // return await axiosPrivate.post("/bill/store", data)
   const response = await axiosPrivate.post("/bill/store", data)
        if(response){
            localStorage.setItem('bill_user', JSON.stringify(response?.data?.bill));
        }
   return response
}
export const updateBillAndSendMail=async(id:number,data:any)=>{
    return await axiosPrivate.put(`/bill/update/${id}`,data)
}
// export  const getAllBillsByUserId=(userId:string|undefined):Promise<any>=>{
//      let user = userId || localStorage.getItem("user");
//       user = user ? user : "";
//        const token = `Bearer ${localStorage.getItem("token")}`;
//        const config = { headers: { Authorization: token } };
//        return axiosPrivate.get(`/bill/show/all/${user}`,config);
// }
export const getOneBillById=(id:number)=>{
    return axiosPrivate.get(`/bill/edit/${id}`)
}
export const cancelBill=async(id:number)=>{
    return await axiosPrivate.delete(`/bill/delete/${id}`,)
}
export const paymentVNP = async (data: any) => {
    return await axiosPrivate.post("/payment", data)
}