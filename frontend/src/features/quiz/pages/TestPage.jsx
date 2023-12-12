import { FaFilter, FaSave, FaTrash } from "react-icons/fa";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import CreateQuizComponent from "../components/CreateQuizComponent";
import SecondHeader from "../../../global_components/SecondHeader";





function TestPage() {

    return (
        <div>
            <SecondHeader />
            <CreateQuizComponent />
        </div>
    )
}

export default TestPage