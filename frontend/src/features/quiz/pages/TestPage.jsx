import { FaFilter, FaSave, FaTrash } from "react-icons/fa";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import CreateQuizComponent from "../components/CreateQuizComponent";
import SecondHeader from "../../../global_components/SecondHeader";
import Footer from '../../../global_components/Footer';




function TestPage() {

    return (
        <div>
            <SecondHeader />
            <CreateQuizComponent />
            <Footer />
        </div>
    )
}

export default TestPage