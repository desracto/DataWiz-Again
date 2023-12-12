import { FaFilter, FaSave, FaTrash } from "react-icons/fa";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styles from "../components/Dropzone.module.css";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import SecondHeader from "../../../global_components/SecondHeader";



function Dropzone({ className }) {

    const [files, setFiles] = useState([]);
    const [questionList, setQuestionList] = useState([]);

    {/* Dropzone Hook */ }
        // Dropzone callback functions
        // onDrop -> called when a user manually drags and drops a file
        const onDrop = useCallback((acceptedFiles) => {
            if (acceptedFiles?.length) {
                // recieves the previous files from the array and appends to it
                // sets the new file but alongside an object URL for displaying in an image tag
                setFiles(previousFiles => [
                    ...previousFiles,
                    ...acceptedFiles.map(file =>
                        Object.assign(file, { preview: URL.createObjectURL(file) }))
                ])


            }
        }, [])

        useEffect(() => {
            setQuestionList(prevQuestions => {
                const newList = [...prevQuestions]
                if (newList.length > 0) {
                    try {
                        newList[files.length - 1].schema[0] = files[files.length - 1]
                    }
                    catch
                    {
                        console.log('oops')
                    }
                }
                return newList
            })
        }, [files]);

        // Dropzone hook
        const { getRootProps, getInputProps, open, isDragActive } = useDropzone({ onDrop })
    {/* Dropzone Hook */ }

    {/* Event handlers */ }
        const handleFormSubmit = (e) => {
            console.log(questionList)
        }

        const handleAddingSchema = () => {
            setQuestionList(prevQuestions => [
                ...prevQuestions,
                {
                    schema: [],
                    questions: []
                }
            ])
        }

        const handleAddingProblem = (index) => {
            console.log(index)
            if (questionList[questionList.length - 1].schema === 0) {
                alert("Add a schema first - REMOVE THIS")
                return
            }
            else {
                setQuestionList((prevQuestionList) => {
                    const newList = [...prevQuestionList]
                    newList[index].questions.push({
                        problem: "",
                        answer: " ",
                        question_number: 0
                    })
                    newList[index].questions[newList[index].questions.length - 1].question_number = newList[index].questions.length - 1

                    return newList
                })
            }
        }

        // Handles the value changes for problems and answers
        const handleInputChange = (questionListIndex, questionIndex, field, value) => {
            setQuestionList((prevQuestions) => {
                const updatedQuestions = [...prevQuestions]
                updatedQuestions[questionListIndex].questions[questionIndex][field] = value
                // console.log(updatedQuestions)
                return updatedQuestions;
            })
        }
    {/* Event handlers */ }


    return (
        <div>
            <SecondHeader />
            <form>
                <div className={styles.create_quiz_container}>

                    <div className={styles.header_container}>
                        {/* Create Quiz Title */}
                        <div className={styles.create_quiz_title}>Create Quiz</div>
                        {/* Create Quiz Title */}

                        <div className={styles.buttons}>
                            {/* Autograding Filters*/ }
                                <div className={styles.autograding_filter_button}>
                                    <FaFilter size={25} color="#98989F" />
                                    <span className={styles.autograding_filter_title}>Auto-Grading Filters</span>
                                </div>
                            {/* Autograding Filters*/ }

                            {/* Save Quiz Button*/}
                            <div className={styles.save_quiz_button}>
                                <FaSave size={30} color="#98989F" />
                                <span className={styles.save_quiz_title}>Save Quiz</span>
                            </div>
                            {/* Save Quiz Button*/}
                        </div>
                    </div>
                    
                    {/* Quiz Name */}
                    <div className={styles.quiz_name}>
                        <label className={styles.quiz_name_title}>Enter Quiz Name</label>
                        <input  className={styles.input}
                                placeholder="Enter Quiz Name"
                        />
                    </div>
                    {/* Quiz Name */}

                    {/* Quiz Description */}
                        <div className={styles.quiz_description_holder}>
                            <label className={styles.quiz_description_describer}>
                                Write a description for your quiz
                            </label>
                            <textarea className={styles.quiz_description}
                                      placeholder="Description"
                                      rows={5}
                                      style={{resize: "none"}} 
                            />
                        </div>
                    {/* Quiz Description */}

                    {questionList.map((question, index) => (
                        <div className={styles.question} key={index}>
                            {/* Schema Section */}
                            <div className={styles.schema_box}>

                                {/* Schema Title */}
                                <div className={styles.schema_title}> Schema - {index + 1} </div>
                                {/* Schema Title */}

                                {/* Check if the schema has been set for the current question set */}
                                {question.schema.length === 0 ? (
                                    <div {...getRootProps()} className={`${styles.input_section} ${isDragActive ? "dragActive" : "dragInactive"}`}>
                                        {/* Main input section for the schema */}
                                        <div className={styles.input_area}>
                                            <span className={styles.schema_box_content}>
                                                <input {...getInputProps()} />

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-[80px] h-[80px] text-gray-600"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                    />
                                                </svg>

                                                <span className={styles.schema_box_text}>
                                                    Drag & Drop, Upload/Paste Image
                                                </span>

                                                <button className={styles.schema_box_browse_button}
                                                    onClick={(e) => { e.preventDefault(); open; }} >
                                                    Browse
                                                    <MdOutlineAddCircleOutline
                                                        className="ml-3"
                                                        color={"#8A5A8E"}
                                                        size={26}
                                                    />
                                                </button>

                                                <span className={styles.text_image_size}>Max Image Size: 5MB</span>
                                            </span>
                                        </div>
                                        {/* Main input section for the schema */}
                                    </div>

                                ) : question.schema.length === 1 ? (
                                    <div className={styles.display_schema_section}>
                                        <img src={question.schema[0].preview}
                                             className={styles.schema_image}
                                        />
                                    </div>
                                ) : null}
                            </div>
                            {/* Schema Section */}

                            {/* Problem-Answer section */}
                            {question.questions.map((problem, questionIndex) => (
                                <div className={styles.problem_holder}>

                                    <div className={styles.question_number}>Question - {problem.question_number + 1}</div>

                                    <div className={styles.problem_answer_holder}>

                                        {/* Problem Holder */}
                                        <div className={styles.problem_text_holder}>
                                            <label className={styles.problem_title}>Problem: </label>
                                            <textarea className={styles.problem}
                                                defaultValue={problem.problem}
                                                rows={4}
                                                onChange={(e) => handleInputChange(index, questionIndex, 'problem', e.target.value)}
                                            />
                                        </div>
                                        {/* Problem Holder */}

                                        {/* Answer Holder */}
                                        <div className={styles.answer_holder}>
                                            <label className={styles.answer_title}>Answer: </label>
                                            <textarea className={styles.answer}
                                                defaultValue={problem.answer}
                                                rows={4}
                                                onChange={(e) => handleInputChange(index, questionIndex, 'answer', e.target.value)}
                                            />
                                        </div>
                                        {/* Answer Holder */}
                                        
                                    </div>
                                </div>
                            ))}
                            {/* Problem-Answer section */}

                            {/* Button for adding a problem-answer pair */}
                            <button className={styles.add_problem}
                                onClick={(e) => { handleAddingProblem(index); e.preventDefault(); }}>
                                onClick={(e) => { handleAddingProblem(index); e.preventDefault(); }}>
                                Add Problem & Answer
                            </button>
                        </div>
                    ))}

                    <div className={styles.button_holders}>
                        {/* Button for adding a question (schema, problem, answer) */}
                        <button className={styles.add_schema_button}
                            onClick={(e) => { handleAddingSchema(); e.preventDefault(); }}>
                            onClick={(e) => { handleAddingSchema(); e.preventDefault(); }}>
                            Add new schema
                        </button>

                        <button className={styles.submit_button}
                            onClick={(e) => { handleFormSubmit(); e.preventDefault(); }}>
                            onClick={(e) => { handleFormSubmit(); e.preventDefault(); }}>
                            SUBMIT
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Dropzone