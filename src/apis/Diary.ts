import axios from "axios";
import { IQuestionDto } from "./Question";

const API_URL = "http://3.36.144.124:8080/diary";

export interface IDiaryDto {
    id : number
    userId : string
    answer1 : string
    answer2 : string
    answer3 : string
    answer4 : string
    answer5: string
    questionIdList : string
    createdDate : Date
    emotionType : string
    questionDtoList : IQuestionDto[] | undefined
}

export const registerDiary = async (diaryDto : Partial<IDiaryDto>) => {
    const response = await axios.post(API_URL, diaryDto, {withCredentials: true});
    return response.data;
}

export const countDiary = async (user_id : string) => {
    const response = await axios.get(`${API_URL}/total/${user_id}`, {withCredentials: true});
    return response.data;
}

export const getUserDiary = async (user_id : string) => {
    const response = await axios.get(`${API_URL}/list/${user_id}`, {withCredentials: true});
    return response.data;
}

export const checkUserDiary = async (user_id : string) => {
    const response = await axios.get(`${API_URL}/check/${user_id}`, {withCredentials: true});
    return response.data;
}

export const getOneDiary = async (diary_id : number) => {
    const response = await axios.get(`${API_URL}/${diary_id}`, {withCredentials: true});
    return response.data;
}

export const analysisDiary = async (diary_id : number) => {
    return await axios.get(`${API_URL}/analysis/${diary_id}`, {withCredentials: true});
}
