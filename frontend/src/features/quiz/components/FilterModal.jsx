import React from "react";
import ToggleSwitch from "../../../global_components/ToggleButton";

function FilterModal({onClose}) {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-screen flex justify-center items-center bg-black/70">
      <div className="flex flex-col h-auto bg-[#D8D8D8] w-[1200px] md:max-w-[868px]  p-10 md:p-14 rounded-3xl shadow-lg items-center">
        <div className="flex w-full max-w-7xl flex-col mb-8">
          <div className="text-black mb-8">
            <div className="text-[3rem] mb-2 font-bold inline-block [text-shadow:0px_2px_2px_rgba(0,_0,_0,_0.25)] font-gilroy-semibold w-[100%] ">
              Auto-Grading Filters
            </div>
            <div className="text-base font-gilroy-regular flex items-center">
              Enhance the precision of query grading by configure filters to
              tailor the assessment of student answers and ensure accurate
              evaluations within DataWiz.
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-6 justify-start items-center">
            <div className="w-2/3 mb-6">
                <ToggleSwitch
                label="Join VS Inner-Join"
                unique_by="1"
                />
            </div>
            <div className="w-2/3 mb-6">
                <ToggleSwitch
                label="Spell Checker"
                unique_by="2"
                />
            </div>
            <div className="w-2/3 mb-6">
                <ToggleSwitch
                label="Case Sensitive"
                unique_by="3"
                />
            </div>
            <div className="w-2/3 mb-6">
                <ToggleSwitch
                label="Typo"
                unique_by="4"
                />
            </div>
            <div className="w-2/3">
                <ToggleSwitch
                label="From-Join"
                unique_by="5"
                />
            </div>
            <div className="w-2/3">
                <ToggleSwitch
                label="Table comparison"
                unique_by="6"
                />
            </div>

          </div>
        </div>
        <div className="flex flex-wrap w-full space-3 gap-3 justify-center items-center mt-8">
            <button
              className=" bg-[#8A5A8E] text-white flex items-center border-none justify-center py-5 rounded-xl shadow-lg w-full md:min-w-[136px] md:w-[40%] !font-bold cursor-pointer font-gilroy-bold"
              onClick={onClose}
            >
              Return to Quiz
            </button>
            <button
              className="flex items-center justify-center py-5 border-none rounded-xl shadow-lg min-w-[136px] w-full md:min-w-[136px] md:w-[40%] bg-primary !font-bold cursor-pointer font-gilroy-bold"
            >
              Preview Quiz
            </button>
          </div>
      </div>
    </div>
  );
}

export default FilterModal;
