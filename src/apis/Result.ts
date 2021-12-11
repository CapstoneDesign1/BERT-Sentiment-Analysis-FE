import axios from "axios";

const API_URL = "http://3.36.144.124:8080/result";

export interface IResultDto {
    id : number,
    sadScore : number,
    emotionType : string,
    depress : number
}

export const resultDiary = async (user_id : string) => {
    const response = await axios.get(`${API_URL}/${user_id}`, {withCredentials : true});
    return response.data;
}