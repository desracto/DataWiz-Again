import { useState, useCallback } from "react";
import LogoutConfirmationPopUp from "../components/LogoutConfirmationPopUp.jsx";
import PortalPopup from "../components/PortalPopup.jsx";
import DeleteConfirmationPopUp from "../components/DeleteConfirmationPopUp.jsx";
import SaveChangesPopUp from "../components/SaveChangesPopUp.jsx";
import "./AccountSettingPage.css";
import { useForm } from "react-hook-form";

import vector from '../../../assets/images/vector.svg'
import SecondHeader from "../../../global_components/SecondHeader.jsx";

const AccountSettingPage = () => {
    const {register, handleSubmit, formState: { errors }} = useForm();
    const [userInfo, setUserInfo] = useState();

  const [isLogoutConfirmationPopUpOpen, setLogoutConfirmationPopUpOpen] =
    useState(false);
  const [isDeleteConfirmationPopUpOpen, setDeleteConfirmationPopUpOpen] =
    useState(false);
  const [isSaveChangesPopUpOpen, setSaveChangesPopUpOpen] = useState(false);

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

  const openSaveChangesPopUp = useCallback(() => {
    setSaveChangesPopUpOpen(true);
  }, []);

  const closeSaveChangesPopUp = useCallback(() => {
    setSaveChangesPopUpOpen(false);
  }, []);

return(
    <>
        <SecondHeader/>
        <div className="account-setting-page">
            <div className = "Settings-Card">
                <div className="Card-Header">
                    <div className="account-settings">
                        Account Settings
                    </div>
                    <button className="settings-edit-button">
                        <img  src={vector} />
                    </button>
                </div>
                <div className="settings-subheadings">Personal Information</div>
                <form action="">
                        <div className="settings-input-label">
                            Full name
                        </div>
                        <input
                            className="settings-textbox1"
                            placeholder="Enter your full name"
                            type="text"
                             {...register("fullName", { required: "Full Name is required", pattern : {value:/^[A-Za-z ]+$/i, message: "Full name must contain only letters and spaces"}})}
                        />

                        <div className="settings-input-label">Username</div>
                        <input 
                            className="settings-textbox1" 
                            placeholder="Enter your username" 
                            type="text" 
                             {...register("username", { required: "Username is required", pattern : {value:/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,20}$/, message: "Username must be between 6 and 20 characters ,include at least 1 uppercase letter and 1 numeric digit"} })}
                        />

                        <div className="settings-input-label">Email</div>
                        <input
                            className="settings-textbox1"
                            placeholder="Enter your email"
                            type="email"
                             {...register("email", { required: "Email is required",  pattern : {value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Enter a valid email address"}})}
                        />
                        <div className="settings-subheadings">Change Password</div>

                        <div className="settings-input-label">Current Password</div>
                        <input 
                            className="settings-textbox1" 
                            type="password"
                            placeholder="**********" 
                             {...register("current_password", { required: "Password is required", pattern : {value:/^(?=.*[!@#\$%^&*()\-_=+\[\]{}|;:'",.<>?\/\\]).{8,64}$/, message: "Password must be between 8 and 64 characters and contain at least one special character"}})}
                        />

                        <div className="settings-input-label">New Password</div>
                        <input 
                            className="settings-textbox1" 
                            type="password"
                            placeholder="**********" 
                             {...register("new_password", { required: "Password is required", pattern : {value:/^(?=.*[!@#\$%^&*()\-_=+\[\]{}|;:'",.<>?\/\\]).{8,64}$/, message: "Password must be between 8 and 64 characters and contain at least one special character"}})}
                        />

                        <div className="settings-input-label">Confirm Password</div>
                        <input 
                            className="settings-textbox1" 
                            type="password"
                            placeholder="**********" 
                             {...register("confirm_password", { required: "Password is required", pattern : {value:/^(?=.*[!@#\$%^&*()\-_=+\[\]{}|;:'",.<>?\/\\]).{8,64}$/, message: "Password must be between 8 and 64 characters and contain at least one special character"}})}
                        />

                        <div className="settings-subheadings">Change Account Type</div>

                        <div className="settings-checkbox-group1">
                                <div className ="settings-checkbox-group2">
                                    <input
                                        className="settings-checkbox"
                                        id="learner check"
                                        type="radio"
                                        name="account_type"
                                        value = "learner"
                                         {...register("account_type", { required: "Please select an account type" })}
                                    />
                                    <label className="settings-checkbox-label">Learner</label>
                                </div> 
                                <div className ="settings-checkbox-group2">
                                    <input
                                        className="settings-checkbox"
                                        id="instructor check"
                                        type="radio"
                                        name="account_type"
                                        value="instructor"
                                        {...register("account_type", { required: "Please select an account type" })}
                                    />
                                    <label className="settings-checkbox-label">Instructor</label>
                                </div>      
                            </div>

                        <div className ="settings-checkbox-group2">
                            <button 
                                className="settings-delete-account"
                                onClick={openDeleteConfirmationPopUp}
                            >
                            <div className="settings-button-label">Delete Account</div>
                            </button>

                            <button 
                                className="settings-save-changes"
                                onClick={openDeleteConfirmationPopUp}
                            >
                            <div className="settings-button-label">Save Changes</div>
                            </button>
                        </div>

                    <button
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
          <SaveChangesPopUp onClose={closeSaveChangesPopUp} />
        </PortalPopup>
      )}
    </>
)
}
export default AccountSettingPage;



//   return (
//     <>
//       <div className="account-setting-page">
//         <div className="group-parent">
//           <div className="rectangle-parent">
//             <div className="group-child" />
//             <div className="text-button-parent">
            //   <button
            //     className="text-button2"
            //     onClick={openLogoutConfirmationPopUp}
            //   >
            //     <div className="text-button3">Logout</div>
            //   </button>
//               <div className="settings-delete-account-parent">
                // <button
                //   className="settings-delete-account"
                //   onClick={openDeleteConfirmationPopUp}
                // >
                //   <div className="settings-delete-account-child" />
                //   <div className="delete-account">Delete Account</div>
                // </button>
//                 <button
//                   className="settings-save-changes"
//                   onClick={openSaveChangesPopUp}
//                 >
//                   <div className="settings-delete-account-child" />
//                   <div className="delete-account">Save Changes</div>
//                 </button>
//               </div>
//               <div className="account-settings">Account Settings</div>
//               <div className="personal-information">Personal Information</div>
//               <div className="change-password">Change Password</div>
//               <div className="instructor-parent">
//                 <div className="instructor1">Instructor</div>
//                 <input
//                   className="radio-button2"
//                   type="radio"
//                   name="setting_account_type"
//                 />
//               </div>
//               <div className="learner-parent">
//                 <div className="instructor1">Learner</div>
//                 <input
//                   className="radio-button2"
//                   type="radio"
//                   name="setting_account_type"
//                 />
//               </div>
//               <div className="change-account-type">Change Account Type</div>
//               <div className="inputfield1">
//                 <div className="input-label5">Full Name</div>
//                 <input className="textbox5" placeholder="Hiba G" type="text" />
//               </div>
//               <div className="inputfield2">
//                 <div className="input-label5">Current Password</div>
//                 <input
//                   className="textbox6"
//                   placeholder="*************************"
//                   type="password"
//                 />
//               </div>
//               <div className="inputfield3">
//                 <div className="input-label5">Username</div>
//                 <input
//                   className="textbox5"
//                   placeholder="HibaG2318"
//                   type="text"
//                 />
//               </div>
//               <div className="inputfield4">
//                 <div className="input-label5">New Password</div>
//                 <input
//                   className="textbox6"
//                   placeholder="******************"
//                   type="password"
//                 />
//               </div>
//               <div className="inputfield5">
//                 <div className="input-label5">Email</div>
//                 <input
//                   className="textbox5"
//                   placeholder="hibaaligohar@gmail.com"
//                   type="email"
//                 />
//               </div>
//               <div className="inputfield6">
//                 <div className="input-label5">Confirm Password</div>
//                 <input
//                   className="textbox6"
//                   placeholder="******************"
//                   type="password"
//                 />
//               </div>
//             </div>
//           </div>
//           <button className="pen-to-square-solid-1">
//             <img className="vector-icon" alt="" src={vector} />
//           </button>
//         </div>
//       </div>
//       {isLogoutConfirmationPopUpOpen && (
//         <PortalPopup
//           overlayColor="rgba(65, 62, 62, 0.5)"
//           placement="Centered"
//           onOutsideClick={closeLogoutConfirmationPopUp}
//         >
//           <LogoutConfirmationPopUp onClose={closeLogoutConfirmationPopUp} />
//         </PortalPopup>
//       )}
//       {isDeleteConfirmationPopUpOpen && (
//         <PortalPopup
//           overlayColor="rgba(65, 62, 62, 0.5)"
//           placement="Centered"
//           onOutsideClick={closeDeleteConfirmationPopUp}
//         >
//           <DeleteConfirmationPopUp onClose={closeDeleteConfirmationPopUp} />
//         </PortalPopup>
//       )}
//       {isSaveChangesPopUpOpen && (
//         <PortalPopup
//           overlayColor="rgba(65, 62, 62, 0.5)"
//           placement="Centered"
//           onOutsideClick={closeSaveChangesPopUp}
//         >
//           <SaveChangesPopUp onClose={closeSaveChangesPopUp} />
//         </PortalPopup>
//       )}
//     </>
//   );
// };


