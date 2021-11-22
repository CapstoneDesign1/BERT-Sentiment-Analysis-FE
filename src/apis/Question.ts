import axios from "axios";

const API_URL = "http://3.36.144.124:8080/question";

export interface IQuestionDto {
    id : number
    content : string
}

export const getQuestions = async () => {
    const response = await axios.get(`${API_URL}/list`, {withCredentials: true});
    return response.data;
}
