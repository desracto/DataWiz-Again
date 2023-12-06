import { useState, useCallback, useEffect } from "react";
import LogoutConfirmationPopUp from "../components/LogoutConfirmationPopUp.jsx";
import PortalPopup from '../components/PortalPopup.jsx';
import DeleteConfirmationPopUp from "../components/DeleteConfirmationPopUp.jsx";
import SaveChangesPopUp from "../components/SaveChangesPopUp.jsx";
import "./AccountSettingPage.css";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';

import vector from '../../../assets/images/vector.svg';
import instructorIcon from '../../../assets/images/Settings-Instructor.png';
import SecondHeader from "../../../global_components/SecondHeader.jsx";

const AccountSettingPage = ({request}) => {
    const {register, handleSubmit, setValue, formState: { errors }, getValues, trigger} = useForm({ reValidateMode: 'onSubmit' });
    const [isEditMode, setEditMode] = useState(false);
    const [originalValues, setOriginalValues] = useState({});
    const [trackedChanges, setTrackedChanges] = useState({});
    const [isSaveChangesPopUpOpen, setSaveChangesPopUpOpen] = useState(false);  
    const [isLogoutConfirmationPopUpOpen, setLogoutConfirmationPopUpOpen] = useState(false);
    const [isDeleteConfirmationPopUpOpen, setDeleteConfirmationPopUpOpen] = useState(false);
    const [userData, setUserData] = useState(null); 

    // Loading user data 
    useEffect(() => {
        const fetchUserData = async () => {
            request({
                url: "api/user/load_user/",
                method: 'get',
                withCredentials: true
            })
            .then(response => {
                console.log(response.data);
                setValue("fullName", response.data.fullname);
                setValue("username", response.data.username);
                setValue("email", response.data.email);
            })
            .catch(error => {
                console.error(error.response);
            });
        };

        fetchUserData();
    }, [setValue]);

    const startEditMode = useCallback(() => {
        setOriginalValues(getValues());
        setEditMode(true);
    }, [getValues()]);

    // Submit function
    const onSubmit = async (data) => {
        // Trigger form validation
        const isValid = await trigger();
    
        if (isValid) {
            const changes = {};
            // Update tracked changes for fields that have changed
            Object.keys(data).forEach((field) => {
                if (data[field] !== originalValues[field]) {
                    changes[field] = data[field];
                }
            });

            // Update trackedChanges with the new changes
            setTrackedChanges(changes);

            // No validation errors, proceed with opening the Save Changes pop-up
            openSaveChangesPopUp();
        }
    };

    // Handling Save or Cancel changes functions
    const handleSaveChanges = () => {
        // Update form values with new values
        const formData = getValues();
        Object.keys(formData).forEach((field) => {
            setValue(field, formData[field]);
        });

        // Exit edit mode
        setEditMode(false);

        // Make API call to update account
        request({
            url: 'api/user/update/',
            method: 'PUT',
            headers: {
                'X-CSRF-TOKEN': Cookies.get('csrf_access_token')
            },
            data: trackedChanges})
        .then(response => {
            console.log(response);

            // Empty dictionary
            setTrackedChanges({})
        })
        .catch(error => console.log(error))

        // Close the pop-up
        closeSaveChangesPopUp();
    };

    const handleCancelChanges = () => {
        // Restore original form values
        Object.keys(originalValues).forEach((field) => {
            setValue(field, originalValues[field]);
        });

        setEditMode(false);

        // Close the pop-up
        closeSaveChangesPopUp();
    };

    // Print tracked changes everytime it updates
    useEffect(() => {
        console.log("Tracked Changes (Updated):", trackedChanges);
    }, [trackedChanges]);

    // Pop up functions
    const openSaveChangesPopUp = useCallback(() => {
        setSaveChangesPopUpOpen(true);
    }, []);

    const closeSaveChangesPopUp = useCallback(() => {
        setSaveChangesPopUpOpen(false);
    }, []);

    const openLogoutConfirmationPopUp = useCallback(() => {
        setLogoutConfirmationPopUpOpen(true);
    }, []);

    const closeLogoutConfirmationPopUp = useCallback(() => {
        setLogoutConfirmationPopUpOpen(false);
    }, []);

    const openDeleteConfirmationPopUp = useCallback(() => {
        setDeleteConfirmationPopUpOpen(true);
    }, []);

    const closeDeleteConfirmationPopUp = useCallback(() => {
        setDeleteConfirmationPopUpOpen(false);
    }, []);


    return (
        <>
            <SecondHeader />
            <div className="account-setting-page">
                <div className="Settings-Card">
                    <div className="Card-Header">
                        <div className="account-settings">
                            Account Settings
                        </div>
                        <button 
                            className="settings-edit-button"
                            id="edit-button"
                            onClick={startEditMode}
                        >
                            <img src={vector} alt="Edit-button" />
                        </button>
                    </div>
                    <div className="settings-subheadings">Personal Information</div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="settings-input-label">
                            Full name
                        </div>
                        <div className={isEditMode ? '' : 'cursor-notAllowed'}>
                            <input
                                className={isEditMode ? "settings-textbox1-edit" : "settings-textbox1"}
                                defaultValue="loading..."
                                type="text"
                                {...register("fullName", { required: "Full Name is required", pattern : {value:/^[A-Za-z ]+$/i, message: "Full name must contain only letters and spaces"}})}
                            />
                            <p className="settings-ErrorMessages">{errors.fullName?.message}</p>
                        </div>
                        <div className="settings-input-label">Username</div>
                        <div className={isEditMode ? '' : 'cursor-notAllowed'}>
                            <input 
                                className={isEditMode ? "settings-textbox1-edit" : "settings-textbox1"}
                                defaultValue="loading..." 
                                type="text"   
                                {...register("username", { required: "Username is required", pattern : {value:/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,20}$/, message: "Username must be between 6 and 20 characters, include at least 1 uppercase letter and 1 numeric digit"} })}
                            />
                            <p className="settings-ErrorMessages">{errors.username?.message}</p>
                        </div>
                        <div className="settings-input-label">Email</div>
                        <div className={isEditMode ? '' : 'cursor-notAllowed'}>
                            <input
                                className={isEditMode ? "settings-textbox1-edit" : "settings-textbox1"}
                                defaultValue="loading..."
                                type="email"
                                {...register("email", { required: "Email is required",  pattern : {value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Enter a valid email address"}})}
                            />
                            <p className="settings-ErrorMessages">{errors.email?.message}</p>
                        </div>
                        <div className="settings-subheadings">Change Password</div>

                        <div className="settings-input-label">Current Password</div>
                        <input 
                            className="settings-textbox1-edit" 
                            type="password"
                            placeholder="**********" 
                            //{...register("current_password", { required: "Password is required", pattern : {value:/^(?=.*[!@#\$%^&*()\-_=+\[\]{}|;:'",.<>?\/\\]).{8,64}$/, message: "Password must be between 8 and 64 characters and contain at least one special character"}})}
                        />

                        <div className="settings-input-label">New Password</div>
                        <input 
                            className="settings-textbox1-edit" 
                            type="password"
                            placeholder="**********" 
                            //{...register("new_password", { required: "Password is required", pattern : {value:/^(?=.*[!@#\$%^&*()\-_=+\[\]{}|;:'",.<>?\/\\]).{8,64}$/, message: "Password must be between 8 and 64 characters and contain at least one special character"}})}
                        />

                        <div className="settings-input-label">Confirm Password</div>
                        <input 
                            className="settings-textbox1-edit" 
                            type="password"
                            placeholder="**********" 
                            //{...register("confirm_password", { required: "Password is required", pattern : {value:/^(?=.*[!@#\$%^&*()\-_=+\[\]{}|;:'",.<>?\/\\]).{8,64}$/, message: "Password must be between 8 and 64 characters and contain at least one special character"}})}
                        />

                        <div className="settings-input-label"> Account Type: </div>
                        <div className="settings-checkbox-group2">
                            <img className="instructor-icon" src={instructorIcon} alt="instructor-icon" />
                            <div className="instructor-label">  Instructor</div>
                        </div>

                        <div className="settings-checkbox-group2">
                            <button 
                                type="button" // Do not remove, import so button does not submit the form
                                className="settings-delete-account"
                                onClick={openDeleteConfirmationPopUp}
                            >
                                <div className="settings-button-label">Delete Account</div>
                            </button>

                            <button 
                                type="submit" 
                                className="settings-save-changes"
                            >
                                <div className="settings-button-label">Save Changes</div>
                            </button>
                        </div>

                        <button
                            type="button" // Do not remove, import so button does not submit the form
                            className="logout-button"
                            onClick={openLogoutConfirmationPopUp}
                        >
                            <div className="logout-button-text">Logout</div>
                        </button>
                    </form>
                </div>
            </div>

            {isLogoutConfirmationPopUpOpen && (
                <PortalPopup
                    overlayColor="rgba(65, 62, 62, 0.5)"
                    placement="Centered"
                    onOutsideClick={closeLogoutConfirmationPopUp}
                >
                    <LogoutConfirmationPopUp onClose={closeLogoutConfirmationPopUp} />
                </PortalPopup>
            )}
            {isDeleteConfirmationPopUpOpen && (
                <PortalPopup
                    overlayColor="rgba(65, 62, 62, 0.5)"
                    placement="Centered"
                    onOutsideClick={closeDeleteConfirmationPopUp}
                >
                    <DeleteConfirmationPopUp onClose={closeDeleteConfirmationPopUp} />
                </PortalPopup>
            )}
            {isSaveChangesPopUpOpen && (
                <PortalPopup
                    overlayColor="rgba(65, 62, 62, 0.5)"
                    placement="Centered"
                    onOutsideClick={closeSaveChangesPopUp}
                >
                    <SaveChangesPopUp
                        onConfirm={handleSaveChanges}  
                        onCancel={handleCancelChanges}
                    />
                </PortalPopup>
            )}
        </>
    );
};

export default AccountSettingPage;
