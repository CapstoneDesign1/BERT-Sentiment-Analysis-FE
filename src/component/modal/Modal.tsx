import React, {useEffect, useRef, useState} from "react";
import { IDiaryDto } from "../../apis/Diary"
import style from "./modal.module.css"

export interface IDiaryModalProps {
    diaryDto : IDiaryDto | undefined
    setModalOpen : (state: boolean) => void;
}

const Modal = ({diaryDto, setModalOpen} : IDiaryModalProps) : JSX.Element => {

    const targetRef = useRef<HTMLDivElement>(null);
    const [answerList, setAnswerList] = useState<string[]>([]);

    const onModalClose = () => {
        setModalOpen(false);
    }

    useEffect(() => {
        const answerList : string[] = [];
        if (diaryDto) {
            answerList.push(diaryDto?.answer1);
            answerList.push(diaryDto?.answer2);
            answerList.push(diaryDto?.answer3);
            answerList.push(diaryDto?.answer4);
            answerList.push(diaryDto?.answer5);
        }
        setAnswerList(answerList);
    }, []);

    useEffect(()=> {
        const handleKeyDown = (e : KeyboardEvent) => {
            if (e.key === 'Escape') {
                onModalClose();
            }
        }

        const handleClickOutside = (e: MouseEvent) => {
            if (targetRef.current && !targetRef.current.contains(e.target as Node)) {
                onModalClose();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    },[targetRef]);

    return (
        <div className={style.modal}>
            <div className={style.modal_box} ref={targetRef}>
                <div className={style.modal_inner}>
                    <div className={style.navbar}>
                        <span className={style.modal_title}>그 날의 기록</span>
                        <button className={style.close_button} onClick={onModalClose}>닫기</button>
                    </div>
                    <div className={style.chat_box}>
                    {diaryDto &&
                        diaryDto.questionDtoList?.map((item, index) => (
                            <div className={style.detail_box} key={item.id}>
                                <span className={style.question_content}>Q. {item.content}</span>
                                <div className={style.answer_box}>
                                    <div className={style.answer_content}>{answerList[index]}</div>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;