import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaFilter, FaSave, FaTrash } from "react-icons/fa";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import FilterModal from "../components/FilterModal";
import SuccessModal from "../components/SuccessModal";
import "./CreateQuiz.css";

function CreateQuiz() {
  const [schemaAdded, setSchemaAdded] = useState(false);
  const [files, setFiles] = useState([]);
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");

  const [schemasList, setSchemasList] = useState([]);

  const saveQuiz = () => {
    if (!quizName.trim()) {
      alert("Please enter a quiz name.");
      return;
    }

    const currentDate = new Date();
    const newQuiz = {
      id: Date.now(), // Simple unique ID for demonstration
      name: quizName,
      description: quizDescription,
      questions: questions,
      date: currentDate.toLocaleDateString(), // Saves only the date
      time: currentDate.toLocaleTimeString(), // Saves only the time
    };

    const savedQuizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
    savedQuizzes.unshift(newQuiz); // Add the new quiz at the beginning of the array
    localStorage.setItem("quizzes", JSON.stringify(savedQuizzes));

    setQuizName("");
    setQuizDescription("");
    setQuestions([]);
    alert("Quiz saved successfully!");
  };

  const handleSubmission = (id) => {
    const exist = schemasList.find((schema) => schema?.id == id);
    if (exist?.files?.length == 0) {
      alert("Please upload an image before submitting.");
    } else {
      setShowSubmitButton(false);
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

  const onDrop = (acceptedFiles) => {
    // setFiles((prevFiles) => [
    //   ...prevFiles,
    //   ...acceptedFiles.map((file) => ({
    //     ...file,
    //     preview: URL.createObjectURL(file),
    //   })),
    // ]);

    const currentRef = getInputProps()?.ref;

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
    setSchemaAdded(true);
    setShowSubmitButton(true);
  };

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop,
    multiple: false,
  });
  const [schema, setSchema] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [questions, setQuestions] = useState([]);

  const addLine = () => {
    if (!showSubmitButton) {
      if (schemaAdded || questions?.length > 0) {
        setQuestions((prevLines) => [
          ...prevLines,
          {
            id: prevLines[prevLines.length - 1]?.id + 1,
            question: "",
            answer: "",
          },
        ]);
      } else {
        setQuestions([...questions, { id: 1, question: "", answer: "" }]);
        alert("Please add a schema first.");
      }
    } else {
      alert("Please add the schema to the current quiz before adding questions.");
    }
  };
  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  return (
    <div className="create-quiz-container">
      {filterModal ? <FilterModal onClose={() => setFilterModal(false)} /> : null}
      {successModal ? <SuccessModal onClose={() => setSuccessModal(false)} /> : null}

      <div className="flex w-full max-w-3xl flex-col mb-8">
        <div className="createquiz-contentcontainer">
          <div className="flex-container">
            <div className="createquiz-style">Create Quiz</div>
            {questions?.length > 0 || schemaAdded ? (
              <div className="flex-row-container">
                <div className="flex-center-filter-save" onClick={() => setFilterModal(true)}>
                  <FaFilter size={25} color="#98989F" />
                  <span className="text-gilroy-semibold ">Auto-Grading Filters</span>
                </div>
                <div className="flex-center-filter-save" onClick={() => setSuccessModal(true)}>
                  <FaSave size={30} color="#98989F" />
                  <span className="text-gilroy-semibold " onClick={saveQuiz}>
                    Save Quiz
                  </span>
                </div>
              </div>
            ) : null}
          </div>

          <div className="centered-full-width ">
            <div className="flex-column-full ">
              <label className="text-Gilroy-Mediumm">Enter Quiz Name</label>
              <input
                className="input"
                placeholder="Enter Quiz Name"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
              />
            </div>
          </div>
          <div className="centered-full-width">
            <div className="flex-column-full">
              <label className="text-Gilroy-Mediumm">
                Write a description/instruction for your quiz
              </label>
              <textarea
                className="description-textarea"
                placeholder="Description"
                rows={5}
                style={{ resize: "none" }} // Add this line
              />
            </div>
          </div>

          {schemasList?.length > 0 ? (
            <div className="w-full flex flex-col gap-5">
              {schemasList.map((schema, index) => (
                <div key={index}>
                  <div className="flex-justify-between">
                    <span className="text-Gilroy-Mediumm">Schema - {index + 1}</span>
                    <FaTrash
                      color="#98989F"
                      size={24}
                      onClick={() => {
                        // setFiles([]);
                        setSchemasList((prev) => prev.filter((s) => s.id !== schema?.id));
                        if (schemasList?.length == 0) {
                          setSchema(false);
                        } else {
                          setShowSubmitButton(false);
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div className="schema-box">
                    {schema?.files?.length === 0 ? (
                      <div
                        className={`auto-width-center ${
                          isDragActive ? "bg-gray-100" : "bg-white"
                        }`}
                        {...getRootProps()}
                      >
                        <label
                          className={`flex-justify-center-full ${
                            files?.length > 0 ? "h-[80px]" : "h-[280px]"
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
                                  // onLoad={(e) => {!checkImageDiamension({width:e.target.naturalWidth,height:e.target.naturalHeight})&&setWrongSize([...wrongSize,index])}}
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
                </div>
              ))}
            </div>
          ) : null}

          {questions?.map((val, index) => {
            return (
              <div key={index}>
                <div className="flex-justify-between">
                  <span className="text-Gilroy-Mediumm">Question -{index + 1}</span>
                  <FaTrash
                    color="#98989F"
                    size={24}
                    onClick={() => removeQuestion(index)}
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

          <div className="createquiz-bottom-container">
            <button className=" addnewquestion-button" onClick={addLine} disabled={!schemaAdded}>
              {"Add New Question & Answer"}
            </button>
            <button
              className="addnewschema-button"
              onClick={() => {
                setSchema(true);
                setSchemaAdded(true);
                setShowSubmitButton(true);

                setSchemasList((prev) => [
                  ...prev,
                  {
                    id: Math.floor(Math.random() * 100 + 20),
                    files: [],
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
  );
}

export default CreateQuiz;
