import { useState } from 'react'
import "./FaqsPage.css"
import SecondHeader from "../../../global_components/SecondHeader";
import Accordion from '../components/AccordionItem';
import Footer from '../../../global_components/Footer';

// questions and answers for the FAQs page
const data = [
    {
        question: "What is DataWiz?",
        answer: `DataWiz is a web app that caters to both learners and instructors of SQL.
                It offers an interactive learners' module with animated query execution and an instructor's module for quiz creation and auto-grading student answers.`,
    },
    {
        question: "How can I access DataWiz?",
        answer: `You can access DataWiz by visiting our website and signing up for an account. Once registered, you can log in to the app using your credentials.`
    },
    {
        question: "Is DataWiz compatible with all devices?",
        answer: `Yes, DataWiz is a web-based application that can be accessed on any device with a modern web browser, including desktops, laptops, tablets, and smartphones.`
    },
    {
        question: "How many schemas are available in the learners' module?",
        answer: `DataWiz provides five pre-defined database schemas for learners to practice writing queries in different scenarios.`
    },
    {
        question: "How does the animation feature work?",
        answer: "In the learners' and instructors' accounts, you select a schema, write a query based on the selected schema, and DataWiz provides an animation that illustrates the step-by-step process of executing the query inside the database."
    },
    {
        question: "Can I save and revisit my query animations?",
        answer: "Yes, DataWiz allows you to save your query animations to your profile, enabling you to review and track your progress."
    },
    {
        question: "How does the auto-grading feature for quizzes function?",
        answer: `In the instructors' accounts, teachers can upload quiz questions, and DataWiz's auto-grading module automatically assesses student answers based 
                on the correct answers provided using a relational algebra tree and filters that the instructors choose to apply.`
    },
    {
        question: "Is DataWiz available for free?",
        answer: `DataWiz offers a free trial period for users to explore its features. After the trial, instructors, and institutions can subscribe monthly or 
                annually to access the full functionality.`
    },
    {
        question: "Is my data secure on DataWiz?",
        answer: "Yes, DataWiz prioritizes data security. User information and query data are encrypted and stored securely to ensure confidentiality."
    },
    {
        question: "How can I get support or report issues?",
        answer: `If you have questions, or concerns, or encounter technical issues while using DataWiz, you can reach our support team at 
                [support email or phone number]. We are here to assist you.`
    },
    {
        question: "Can I use DataWiz for self-paced learning?",
        answer: `Absolutely! DataWiz is designed for self-paced learning, allowing learners to explore SQL concepts and practice at their own convenience.`
    },
    {
        question: "What level of SQL knowledge is required to use DataWiz?",
        answer: `DataWiz caters to users of all levels, from beginners to advanced learners. Whether you're new to SQL or seeking to enhance your skills, 
                DataWiz has resources for you.`
    },
    {
        question: "Can instructors customize quiz questions?",
        answer: "Yes, instructors have the flexibility to create customized quiz questions to align with their teaching goals and curriculum."
    },
    {
        question: "Can I review my quiz results and progress?",
        answer: `Yes, instructors can access detailed quiz results and progress tracking to monitor performance and identify areas for improvement.`
    },
    {
        question: "Are there any interactive tutorials to get started?",
        answer: `DataWiz provides tooltips to guide users through the app's features and functionalities.`
    },
    {
        question: "Is there a mobile app for DataWiz?",
        answer: `While DataWiz is accessible on mobile devices through web browsers, a dedicated mobile app is in development to provide a seamless mobile learning experience.`
    },
    {
        question: "Can I export or share my query animations and quiz results?",
        answer: `Yes, DataWiz allows users to export query animations and quiz results for personal records or sharing with peers and colleagues.`
    },
    {
        question: "How can I provide feedback or suggest new features?",
        answer: `We value user feedback and ideas! You can provide feedback and suggest new features through the app's feedback form or community forums.`
    }
];

const FaqsPage = () => {
    const [selected, setSelected] = useState(null);

    const toggled = (i) => {
        if (selected === i) {
            return setSelected(null);
        }
        setSelected(i);
    };

    return (
        <>
            <SecondHeader />
            <div className="Faqs-container">
                <div className="Faqs-header"> Frequently Asked Questions</div>
                <div className="accordion-container">
                    {/* Mapping through the data to render each FAQ item */}
                    {data.map((item, i) => (
                        <Accordion
                            key={i}
                            question={item.question}
                            answer={item.answer}
                            isSelected={selected === i}
                            onClick={() => toggled(i)}
                        />
                    ))}
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default FaqsPage;