import { useCallback, useEffect, useState } from "react";
import "../styles/QuizTemplate.css";
import pdfimg from "../../../assets/images/pdf.png";
import schemaImg from "../../../assets/images/employee schema.png";
import GeneratedQuizLinkComp from "../components/GeneratedQuizLink";
import { useParams } from 'react-router-dom';
import SecondHeader from "../../../global_components/SecondHeader";
import Footer from '../../../global_components/Footer';
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../../global_components/Loading"
import Cookies from "js-cookie";
import vector from '../../../assets/images/vector.svg';

import DateTimePickerValue from '../components/DateTimePicker';
import CreateQuizComponent from "../components/CreateQuizComponent";


const TestPage = ({request}) => {
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const { id } = useParams(); // quiz ID from url params
    const [showGeneratedQuizLink, setShowGeneratedQuizLink] = useState(false);
    const [quiz, setQuiz] = useState(null)

    useEffect(() => {
        request({
            url: "api/quiz/retrieve-quiz/" + id,
            methods: "post"
        })
        .then(res => {
            console.log(res?.data)
            setQuiz(res?.data)
        })
        .catch(error => {
            console.error(error)
        })
    }, [])
    
    if (!quiz)
    {
        return (
            <LoadingComponent />
        )
    }

    return (
        <>
            <SecondHeader />
            <CreateQuizComponent title={'Edit Quiz'} request={request} defaultQuiz={quiz} isEdit={true} id={id}/>
            <Footer/>
        </>
    );
};

export default TestPage;
