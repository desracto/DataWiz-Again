import { FaFilter, FaSave, FaTrash } from "react-icons/fa";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "../components/Dropzone";




function TestPage() {

    return (
        <Dropzone className={"image-drop-area"}/>
    )
}

export default TestPage