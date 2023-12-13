import { FaFilter, FaSave, FaTrash } from "react-icons/fa";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styles from "../components/CreateQuizComponent.module.css";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import FilterModal from "../components/FilterModal";
import { useClearableField } from "@mui/x-date-pickers";
import PortalPopup from '../components/PortalPopup.jsx';





function CreateQuizComponent({ className }) {

    const [files, setFiles] = useState([]);
    const [questionList, setQuestionList] = useState([]);
    const [quizName, setQuizName] = useState();
    const [quizDescription, setQuizDescription] = useState([]);

    const isDebug = true 

    {/* Pop-up handlers */}
        const [showFilterPopUp, setFilterShow] = useState(false)

        // open the filter pop up
        const openFilters = useCallback(() => {
            setFilterShow(true)
        })

        const closeFilters = useCallback(() => {
            setFilterShow(false)
        })

        useEffect(() => {
            if (isDebug) 
            {
                console.log(showFilterPopUp)
            }
        }, [showFilterPopUp])
    {/* Pop-up handlers */}


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
                if (newList.length > 0 && files.length > 0) 
                {
                    newList[files.length - 1].schema[0] = files[files.length - 1]
                }
                return newList
            })
        }, [files]);

        // Dropzone hook
        const { getRootProps, getInputProps, open, isDragActive } = useDropzone({ onDrop })
    {/* Dropzone Hook */ }

    {/* Event handlers */ }
        // print everytime questionList gets updated
        useEffect(() => {
            if (isDebug)
            {
                console.log(questionList)
            }
        }, [questionList])

        // print quiz name
        useEffect(() => {
            if (isDebug)
            {
                console.log(quizName)
            }
        }, [quizName])

        // print quiz description 
        useEffect(() => {
            if (isDebug)
            {
                console.log(quizDescription)
            }
        }, [quizDescription])


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

        // handles deleting a schema
        const handleSchemaDelete = (questionListIndex) => {
            setQuestionList((prevQuestions) => {
                const updatedQuestions = [...prevQuestions]
                updatedQuestions.splice(questionListIndex, 1)
                return updatedQuestions
            })
        }

        // handles deleting a problem
        const handleProblemDelete = (questionListIndex, questionIndex) => {
            setQuestionList((prevQuestions) => {
                const updatedQuestions = [...prevQuestions]
                updatedQuestions[questionListIndex].questions.splice(questionIndex, 1)
                return updatedQuestions
            })
        }
    {/* Event handlers */ }

    {/* Child Component Data Store */}

        {/* Filter Pop-up */}
            const [filters, setFilters] = useState(
                {
                    'additional_data': false,
                    'spell_checker': false,
                    'matching_join_types': false
                }
            )
        
            const handleFilterToggle = (field) => {
                setFilters(prevFilters => ({
                    ...prevFilters,
                    [field]: !prevFilters[field]
                }))
            }
        
            useEffect(() => {
                if (isDebug)
                {
                    console.log(filters)
                }
            }, [filters])
        {/* Filter Pop-up */}

    {/* Child Component Data Store */}

    return (
        <div>
            <form>
                <div className={styles.create_quiz_container}>
                    <div className={styles.header_container}>
                        {/* Create Quiz Title */}
                        <div className={styles.create_quiz_title}>Create Quiz</div>
                        {/* Create Quiz Title */}

                        <div className={styles.buttons}>
                            {/* Autograding Filters*/ }
                                <div className={styles.autograding_filter_button}
                                     onClick={(e) => {openFilters(true)}}>
                                    <FaFilter size={25} color="#98989F"  />
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
                                onChange={(e) => {setQuizName(e.target.value)}}                                
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
                                      onChange={(e) => {setQuizDescription(e.target.value)}}
                            />
                        </div>
                    {/* Quiz Description */}

                    {questionList.map((question, index) => (
                        <div className={styles.question} key={index}>

                            {/* Schema Section */}
                            <div className={styles.schema_box}>

                                <div className={styles.schema_header_container}>
                                    {/* Schema Title */}
                                    <div className={styles.schema_title}> Schema - {index + 1} </div>
                                    {/* Schema Title */}

                                    <FaTrash
                                        title={'Delete Schema'}
                                        color="#98989F"
                                        size={24}
                                        onClick={() => {
                                            handleSchemaDelete(index)
                                        }}
                                        style={{ cursor: "pointer" }}
                                    />
                                </div>

                                {/* Check if the schema has been set for the current question set */}
                                <div className={styles.schema_section}>
                                    {question.schema.length === 0 ? (
                                        <div {...getRootProps()} className={`${styles.input_section} ${isDragActive ? styles.dragActive : styles.dragInactive}`}>
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
                                                        onClick={(e) => { e.preventDefault(); open(); }} >
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
                                            <button>

                                            </button>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            {/* Schema Section */}

                            {/* Problem-Answer section */}
                            {question.questions.map((problem, questionIndex) => (
                                <div className={styles.problem_holder} key={questionIndex}>

                                    <div className={styles.question_number_header_container}>
                                        <div className={styles.question_number}>Question - {problem.question_number + 1}</div>
                                        <FaTrash
                                                title={'Delete Question'}
                                                color="#98989F"
                                                size={24}
                                                onClick={() => {
                                                    handleProblemDelete(index, questionIndex)
                                                }}
                                                style={{ cursor: "pointer" }}
                                        />
                                    </div>

                                    <div className={styles.problem_answer_holder}>

                                        {/* Problem Holder */}
                                        <div className={styles.problem_text_holder}>
                                            <label className={styles.problem_title}>Problem: </label>
                                            <textarea className={styles.problem}
                                                defaultValue={problem.problem}
                                                rows={4}
                                                onChange={(e) => handleInputChange(index, questionIndex, 'problem', e.target.value)}
                                                style={{ resize: 'none'}}
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
                                                style={{ resize: 'none' }}
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
                                Add Problem & Answer
                            </button>
                        </div>
                    ))}

                    <div className={styles.button_holders}>
                        {/* Button for adding a question (schema, problem, answer) */}
                        <button className={styles.add_schema_button}
                            onClick={(e) => { handleAddingSchema(); e.preventDefault(); }}>
                            Add new schema
                        </button>

                        <button className={styles.submit_button}
                            onClick={(e) => { handleFormSubmit(); e.preventDefault(); }}>
                            SUBMIT
                        </button>
                    </div>
                </div>

                {showFilterPopUp && (
                    <PortalPopup
                        overlayColor="rgba(65, 62, 62, 0.5)"
                        placement="Centered"
                        onOutsideClick={closeFilters}
                    >
                        <FilterModal filters={filters} onFilterChange={handleFilterToggle} onClose={closeFilters} />
                    </PortalPopup>
                )}
            </form>
        </div>
    )
}

export default CreateQuizComponent