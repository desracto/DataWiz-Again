import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

// Define the SuccessModal functional component
function SuccessModal({ onClose }) {
    // Render the SuccessModal component
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-screen flex justify-center items-center bg-black/70">
            {/* Container for the modal */}
            <div className="flex flex-col h-auto bg-[#fff] w-[400px] p-10 md:p-10 rounded-3xl shadow-lg">
                {/* Close icon for closing the modal */}
                <RxCross2 className="cursor-pointer" size={30} onClick={onClose} />

                {/* Content of the modal */}
                <div className="flex w-full max-w-3xl flex-col mb-8 justify-center items-center">
                    {/* Checkmark icon indicating success */}
                    <FaRegCheckCircle size={70} color="#4CAF50" />

                    {/* Text indicating success, e.g., "Saved Quiz" */}
                    <span className="text-[2rem] mt-2 font-bold inline-block [text-shadow:0px_2px_2px_rgba(0,_0,_0,_0.25)] font-gilroy-semibold">
                        Saved Quiz
                    </span>
                </div>
            </div>
        </div>
    );
}

export default SuccessModal;