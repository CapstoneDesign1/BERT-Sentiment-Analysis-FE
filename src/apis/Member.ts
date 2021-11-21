import axios from "axios";

const API_URL = "http://3.36.144.124:8080/member";

export interface IMemberDto {
    isDepressed : boolean
    userId : string
    age : number
    password : string
    email : string
    name : string
}

export const registerMember = async (member : Partial<IMemberDto>) => {
    const response = await axios.post(API_URL, member, {withCredentials: true});
    return response.data;
}

export const duplicateMember = async (userId : string) => {
    const response = await axios.get(`${API_URL}/check/${userId}`, {withCredentials: true});
    return response.data;
}