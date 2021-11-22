import axios from "axios";

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
}

export const registerDiary = async (diaryDto : Partial<IDiaryDto>) => {
    return await axios.post(API_URL, diaryDto, {withCredentials: true});
}
