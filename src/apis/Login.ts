import axios from "axios";

const API_URL = "http://3.36.144.124:8080/login"

export interface ILoginDto {
    userId : string
    password : string
}

export const loginMember = async (loginDto : ILoginDto) => {
    const response = await axios.post(API_URL, loginDto, {withCredentials: true});
    return response;
}
