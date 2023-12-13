import { FaFilter, FaSave, FaTrash } from "react-icons/fa";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import CreateQuizComponent from "../components/CreateQuizComponent";
import SecondHeader from "../../../global_components/SecondHeader";

import svgImage from '../../../assets/images/vector-31.svg';
import svgImage2 from '../../../assets/images/blob-haikei.svg';
import styles from '../pages/CreateQuiz.module.css';


function CreateQuiz({ request }) {

    return (
        <div>
            <div className={styles.header_component}>
                <SecondHeader />
            </div>

            <div className="SVG-CONTAINER">
                <img src={svgImage} alt="SVG Background" className={styles.svg_background} />
                <img src={svgImage2} alt="SVG Background" className={styles.svg_background1} />
                <img src={svgImage} alt="SVG Background" className={styles.svg_background2} />
                <img src={svgImage2} alt="SVG Background" className={styles.svg_background3} />
            </div>

            <div className={styles.page_content_component}>
                <CreateQuizComponent request={request}/>
            </div>
        </div>
    )
}

export default CreateQuiz