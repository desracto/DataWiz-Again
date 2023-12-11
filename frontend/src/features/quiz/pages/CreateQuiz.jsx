import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useLocation } from "react-router-dom"; // Import useLocation
import { useNavigate } from "react-router-dom";
import { FaFilter, FaSave, FaTrash } from "react-icons/fa";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import FilterModal from "../components/FilterModal";
import SuccessModal from "../components/SuccessModal";
import PortalPopup from '../components/PortalPopup.jsx';
import "./CreateQuiz.css";
import SecondHeader from "../../../global_components/SecondHeader";
import axios from "axios";
import Cookies from "js-cookie";

const CreateQuiz = ({ request }) => {
    const navigate = useNavigate();
    const [schemaAdded, setSchemaAdded] = useState(false);
    const [files, setFiles] = useState([]);
    const [showSubmitButton, setShowSubmitButton] = useState(false);

    const location = useLocation(); // Get the location hook

    const [quizName, setQuizName] = useState("");
    const [quizDescription, setQuizDescription] = useState("");

    const [schemasList, setSchemasList] = useState([]);

    const quizNameRef = useRef(quizName);
    const quizDescriptionRef = useRef(quizDescription)

    const [quizData, setQuizData] = useState({
        quiz_name: "",
        start_time: "",
        description: "",
        questions: []
    });

    // Parse JSON data here and initialize quizData
    useEffect(() => {
        fetchQuizData()
            .then(data => {
                setQuizData({
                    quiz_name: data.quiz_name,
                    start_time: data.start_time,
                    description: data.description,
                    questions: data.questions || []
                });
            })
            .catch(error => {
                console.error("Failed to fetch quiz data:", error);
                // Handle error (e.g., set an error state, show notification, etc.)
            });
    }, []);

    const handleQuizDataChange = (key, value) => {
        setQuizData(prev => ({ ...prev, [key]: value }));
    };

    const [isFilterModalOpen, setFilterModalOpen] =
        useState(false);

    const openFilterModal = useCallback(() => {
        setFilterModalOpen(true);
    }, []);

    const closeFilterModal = useCallback(() => {
        setFilterModalOpen(false);
    }, []);

    // Function to generate a unique ID
    function generateUniqueId() {
        // Creates a unique identifier based on the current time and a random number
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    useEffect(() => {
        quizNameRef.current = quizName;
    }, [quizName]);

    useEffect(() => {
        quizDescriptionRef.current = quizDescription;
    }, [quizDescription]);

    const [isDraftLoaded, setIsDraftLoaded] = useState(false);

    const [hasChanges, setHasChanges] = useState(false);

    // Inside CreateQuiz component
    const [loadedDraftId, setLoadedDraftId] = useState(null);

    useEffect(() => {
        if (location.state?.draft) {
            const { id, name, description, questions } = location.state.draft;
            setQuizName(name);
            setQuizDescription(description);
            setSchemasList(questions || []);
            setIsDraftLoaded(true);
            setLoadedDraftId(id); // Store the loaded draft's ID
        }
    }, [location]);

    const saveDraft = () => {
        if (!hasChanges) return; // Exit if no changes
        const currentQuizName = quizNameRef.current;
        const currentQuizDescription = quizDescriptionRef.current;
        if (!currentQuizName.trim()) return;

        const drafts = JSON.parse(localStorage.getItem("drafts") || "[]");

        // Check if we are updating an existing draft
        if (loadedDraftId) {
            const draftIndex = drafts.findIndex(draft => draft.id === loadedDraftId);
            if (draftIndex !== -1) {
                drafts[draftIndex] = {
                    ...drafts[draftIndex],
                    name: currentQuizName,
                    description: currentQuizDescription,
                    date: new Date().toLocaleDateString(), // Update the date to the current date
                    time: new Date().toLocaleTimeString(),
                    // Update other properties as necessary
                };
            }
        } else {
            // Create a new draft if no draft is loaded
            const newDraft = {
                id: generateUniqueId(),
                name: currentQuizName,
                description: currentQuizDescription,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                isDraft: true,
            };
            drafts.unshift(newDraft);
        }

        localStorage.setItem("drafts", JSON.stringify(drafts));
        setHasChanges(false); // Reset the hasChanges state
    };

    /* cleanup function to save the draft only if changes have been made. */
    useEffect(() => {
        return () => {
            if (hasChanges) {
                saveDraft();
            }
        };
    }, [hasChanges]);

    const saveQuiz = () => {
        if (!quizData.quiz_name.trim()) {
            alert("Please enter a quiz name.");
            return;
        }

        const currentDate = new Date();
        const newQuiz = {
            id: Date.now(),
            name: quizData.quiz_name, // Changed to quizData.quiz_name
            description: quizData.description, // Changed to quizData.description
            questions: quizData.questions, // Changed to quizData.questions
            date: currentDate.toLocaleDateString(),
            time: currentDate.toLocaleTimeString(),
        };

        const savedQuizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
        savedQuizzes.unshift(newQuiz); // Add the new quiz at the beginning of the array
        localStorage.setItem("quizzes", JSON.stringify(savedQuizzes));

        setQuizName("");
        setQuizDescription("");
        setQuestions([]);
        alert("Quiz saved successfully!");
        setSuccessModal(true);
    };
    
    useEffect(() => {
        console.log(schemasList)
    }, [schemasList]);

    const handleSubmission = (id) => {
        const exist = schemasList.find((schema) => schema?.id == id);
        if (exist?.files?.length == 0) 
        {
            alert("Please upload an image before submitting.");
        } 
        else 
        {
            setSchemasList((prev) =>
                prev.map((item) => {
                    if (item.id == id) {
                        return {
                            ...item,
                            isSubmitted: false,
                        };
                    } else {
                        return item;
                    }
                })
            );
        }
    };

    const onDrop = useCallback(async (acceptedFiles, fileRejections) => {
        if (fileRejections.length > 0) {
            // Alert the user about the incorrect file format
            alert('Invalid file type. Only .png, .jpg, and .jpeg files are accepted.');
            return;
        } else {
            // Handle the accepted files
            const currentRef = getInputProps()?.ref;
            const binaryFiles = await Promise.all(acceptedFiles.map(file => convertImageToBinary(file)));

            setSchemasList((prev) =>
                prev.map((item) => {
                    if (item.id == currentRef?.current?.id) {
                        return {
                            ...item,
                            files: [
                                ...acceptedFiles.map((file) => ({
                                    ...file,
                                    preview: URL.createObjectURL(file),
                                })),
                            ],
                        };
                    } else {
                        return item;
                    }
                })
            );
        }
    }, []);

    const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
        noClick: true,
        noKeyboard: true,
        onDrop,
        multiple: false,
        accept: {
            "image/png": [".png"],
            "image/jpb": [".jpg"],
            "image/jpeg": [".jpeg"],
        },
    });

    const [schema, setSchema] = useState(false);
    const [filterModal, setFilterModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [questions, setQuestions] = useState([]);
    let overallQuestionCount = 0;


    const addLine = () => {
        if (schemasList.length === 0) {
            alert("Please add a schema first before adding questions.");
            return;
        } else if (schemasList[schemasList.length - 1]?.isSubmitted === true) {
            alert("Please submit the image first before adding questions.");
            return schemasList;
        }

        setSchemasList((prev) => {
            const lastSchema = prev[prev?.length - 1];
            const overallQuestionCount = prev.reduce(
                (count, schema) => count + schema.questions.length,
                0
            );
            const newQuestionId = overallQuestionCount + 1;

            if (lastSchema.files?.length === 0) {
                alert("Please upload an image first before adding questions.");
                return prev;
            }

            const updatedSchemas = prev.map((item) => {
                if (item.id === lastSchema.id) {
                    return {
                        ...item,
                        questions: [
                            ...item.questions,
                            {
                                id: newQuestionId,
                                question: "",
                                answer: "",
                            },
                        ],
                    };
                } else {
                    return { ...item };
                }
            });

            return updatedSchemas;
        });
    };

    const removeQuestion = (schemaId, questionId) => {
        setSchemasList((prev) =>
            prev.map((schema) => {
                if (schema.id === schemaId) {
                    return {
                        ...schema,
                        questions: schema.questions.filter((question) => question.id !== questionId),
                    };
                } else {
                    return { ...schema };
                }
            })
        );
    };

    useEffect(() => {
        fetchQuizData()
            .then(data => {
                setQuizData({
                    quiz_name: data.quiz_name,
                    start_time: data.start_time,
                    description: data.description,
                    questions: data.questions || []
                });
            })
            .catch(error => {
                // Handle the error, such as showing a notification to the user
            });
    }, []);

    const fetchQuizData = async () => {
        try {
            const response = await axios.get('/api/quiz/data'); // Replace with your actual API endpoint
            if (!response.data) {
                throw new Error('No data received');
            }
            return response.data;
        } catch (error) {
            console.error('Failed to fetch quiz data:', error);
            throw error; // Re-throw the error to be handled by the caller
        }
    };


    const handleSubmitQuiz = async () => {
        try {
            // Construct the quiz data object from state or refs
            const quizSubmissionData = {
                quiz_name: quizNameRef.current, // Assuming you're using refs to track form data
                start_time: '', // You'll need to define how to get this value
                description: quizDescriptionRef.current, // Assuming you're using refs to track form data
                questions: schemasList.map((schema, index) => ({
                    question_number: index + 1,
                    problem: schema.problem, // Assuming your schema has a 'problem' property
                    answer: schema.answer // Assuming your schema has an 'answer' property
                })),
                // ... other data you need to submit
            };

            const response = await axios.post('/api/quiz/submit-response', quizSubmissionData, {
                headers: {
                    'X-CSRF-TOKEN': Cookies.get('csrf_access_token'), // Ensure CSRF token is included if needed
                    'Content-Type': 'application/json',
                },
                data: quizSubmissionData,
            });

            if (response.status === 200) {
                console.log('Quiz submitted successfully:', response.data);
                // Handle successful submission, e.g., showing a success message or redirecting
            } else {
                // Handle any other HTTP status codes as needed
                console.warn('Quiz submission returned status:', response.status);
            }
        } catch (error) {
            console.error('Failed to submit quiz:', error);
            // Handle errors in submission, e.g., showing an error message
        }
    };


    const convertImageToBinary = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsBinaryString(file);
        });
    };

    const handleSaveAndSubmitQuiz = async () => {
        // Call saveQuiz function
        saveQuiz();

        // Then call handleSubmitQuiz function
        await handleSubmitQuiz();
    };
    return (
        <>
            <SecondHeader />
            <div className="create-quiz-container">

                {/* Pop up Components */}
                {filterModal ? <FilterModal onClose={() => closeFilterModal(true)} /> : null}
                {successModal ? <SuccessModal onClose={() => setSuccessModal(false)} /> : null}
                {/* Pop up Components */}

                <div className="flex w-full max-w-3xl flex-col mb-8">
                    <div className="createquiz-contentcontainer">
                        <div className="flex-container">
                            <div className="createquiz-style">Create Quiz</div>

                            {/* Autograding & Save Button */}
                            {schemasList ?.length > 0 ? (
                                <div className="flex-row-container">
                                    <div className="flex-center-filter-save" onClick={openFilterModal}>
                                        <FaFilter size={25} color="#98989F" />
                                        <span className="text-gilroy-semibold ">Auto-Grading Filters</span>
                                    </div>
                                    <div
                                        className="flex-center-filter-save"
                                        onClick={handleSaveAndSubmitQuiz}
                                    >
                                        <FaSave size={30} color="#98989F" />
                                        <span className="text-gilroy-semibold " >
                                            Save Quiz
                                        </span>
                                    </div>
                                </div>
                            ) : null}
                            {/* Autograding & Save Button */}

                        </div>

                        {/* Quiz Name */}
                        <div className="centered-full-width ">
                            <div className="flex-column-full ">
                                <label className="text-Gilroy-Mediumm">Enter Quiz Name</label>
                                <input
                                    className="input"
                                    placeholder="Enter Quiz Name"
                                    value={quizData.quiz_name}
                                    onChange={(e) => {
                                        handleQuizDataChange('quiz_name', e.target.value);
                                        setHasChanges(true);
                                    }}
                                />
                            </div>
                        </div>
                        {/* Quiz Name */}

                        {/* Quiz Description */}
                        <div className="centered-full-width">
                            <div className="flex-column-full">
                                <label className="text-Gilroy-Mediumm">
                                    Write a description/instruction for your quiz
                                </label>
                                <textarea
                                    className="description-textarea"
                                    placeholder="Description"
                                    rows={5}
                                    value={quizData.description}
                                    onChange={(e) => {
                                        handleQuizDataChange('description', e.target.value); // updating description within quizData
                                        setHasChanges(true);
                                    }}
                                    style={{ resize: "none" }} // Add this line
                                />
                            </div>
                        </div>
                        {/* Quiz Description */}

                        {/* Schema & Question Section Section */}
                        {schemasList?.length > 0 ? (
                            <div className="w-full flex flex-col gap-5">
                                {schemasList.map((schema, index) => (
                                    <div key={index}>
                                        <div className="flex-justify-between">
                                            <span className="text-Gilroy-Mediumm">Schema - {index + 1} </span>
                                            <FaTrash
                                                color="#98989F"
                                                size={24}
                                                onClick={() => {
                                                    // setFiles([]);
                                                    setSchemasList((prev) => prev.filter((s) => s.id !== schema?.id));
                                                }}
                                                style={{ cursor: "pointer" }}
                                            />

                                        </div>

                                        {/* Schema Section */}
                                        <div className="schema-box">
                                            {schema?.files?.length === 0 ? (
                                                <div
                                                    className={`auto-width-center ${isDragActive ? "bg-gray-100" : "bg-white"
                                                        }`}
                                                    {...getRootProps()}
                                                >
                                                    <label
                                                        className={`flex-justify-center-full ${files?.length > 0 ? "h-[80px]" : "h-[280px]"
                                                            } flex-justify-center-full2`}
                                                    >
                                                        <span className="schema-box-content">
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
                                                            <span className="schemabox-text-gilroy-semibold">
                                                                {"Drag & Drop, Upload/Paste Image"}
                                                            </span>
                                                            {schema?.files?.length === 0 && (
                                                                <button className="schema-box-browsebutton" onClick={open}>
                                                                    Browse
                                                                    <MdOutlineAddCircleOutline
                                                                        className="ml-3"
                                                                        color={"#8A5A8E"}
                                                                        size={26}
                                                                    />
                                                                </button>
                                                            )}
                                                            <span className="span-text-image-size">Max Image Size: 5MB</span>
                                                        </span>

                                                        <input {...getInputProps()} id={schema?.id} />
                                                    </label>
                                                </div>
                                            ) : null}

                                            <div className="flex-wrap-center">
                                                {schema?.files?.length > 0
                                                    ? schema?.files?.map((path, index) => {
                                                        console.log("imageeeiddd", path);
                                                        return (
                                                            <>
                                                                <img
                                                                    src={path.preview}
                                                                    className="schema-image"
                                                                    style={{ backgroundColor: "white" }}
                                                                    alt="img"
                                                                    key={index}
                                                                //    onLoad={(e) => {!checkImageDimension({width:e.target.naturalWidth,height:e.target.naturalHeight})&&setWrongSize([...wrongSize,index])}}
                                                                />
                                                            </>
                                                        );
                                                    })
                                                    : null}
                                            </div>

                                            <div className="submit-button-alignment">
                                                {schema?.isSubmitted && (
                                                    <button
                                                        className=" submit-button-inner"
                                                        onClick={() => handleSubmission(schema.id)}
                                                    >
                                                        {"Submit"}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        {/* Schema Section */}
                                        
                                        {schema?.questions?.map((val, qIndex) => {
                                            return (
                                                <div key={qIndex}>
                                                    <div className="flex-justify-between">
                                                        <span className="text-Gilroy-Mediumm">
                                                            Question -{++overallQuestionCount}
                                                        </span>
                                                        <FaTrash
                                                            color="#98989F"
                                                            size={24}
                                                            onClick={() => removeQuestion(schema?.id, val?.id)}
                                                            className="cursor-pointer"
                                                        />
                                                    </div>
                                                    <div className="auto-width-full-height">
                                                        <div className="width-full-flex-column">
                                                            <div className="width-full-just-centered">
                                                                <div className="flex flex-col w-full ">
                                                                    <label className="text-Gilroy-Mediumm">Problem:</label>
                                                                    <textarea
                                                                        className="problem-answer-textarea "
                                                                        placeholder="Problem"
                                                                        rows={4}
                                                                        style={{ resize: "none" }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="full-width-center-margintop">
                                                                <div className="flex flex-col w-full ">
                                                                    <label className="text-Gilroy-Mediumm">Answer</label>
                                                                    <textarea
                                                                        className="problem-answer-textarea "
                                                                        placeholder="Answer"
                                                                        rows={4}
                                                                        style={{ resize: "none" }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        ) : null}

                        <div className="createquiz-bottom-container">
                            <button className=" addnewquestion-button" onClick={addLine}>
                                {"Add New Question & Answer"}
                            </button>
                            <button
                                className="addnewschema-button"
                                onClick={() => {
                                    setSchemasList((prev) => [
                                        ...prev,
                                        {
                                            id: Math.floor(Math.random() * 100 + 20),
                                            files: [],
                                            questions: [],
                                            isSubmitted: true,
                                        },
                                    ]);
                                }}
                            >
                                Add New Schema
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ------------------------------- */}

            {isFilterModalOpen && (
                <PortalPopup
                    overlayColor="rgba(65, 62, 62, 0.5)"
                    placement="Centered"
                    onOutsideClick={closeFilterModal}
                >
                    <FilterModal onClose={closeFilterModal} />
                </PortalPopup>
            )}

        </>
    );
}

export default CreateQuiz;
