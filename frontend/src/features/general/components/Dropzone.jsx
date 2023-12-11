import { FaFilter, FaSave, FaTrash } from "react-icons/fa";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "../Dropzone.css";

 
function Dropzone({className}) {

    const [files, setFiles] = useState([])


    {/* Dropzone Hook */}

        // Dropzone callback functions
        // onDrop -> called when a user manually drags and drops a file
        const onDrop = useCallback(acceptedFiles => {
            if (acceptedFiles?.length) 
            {
                // recieves the previous files from the array and appends to it
                // sets the new file but alongside an object URL for displaying in an image tag
                setFiles(previousFiles => [
                    ...previousFiles,
                    ...acceptedFiles.map(file => 
                        Object.assign(file, { preview: URL.createObjectURL(file) }))
                ])
            }
        }, [])


        // Dropzone hook
        const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop})

    {/* Dropzone Hook */}

    return (
        <form>
            <div className="schema-box">
                <div className="input-section">

                </div>
            </div>

        </form>
    )
}

export default Dropzone