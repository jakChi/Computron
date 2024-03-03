/* eslint-disable react/prop-types */
import { signOut } from "firebase/auth";

const SignOut = ({ auth, changeUserState }) => {
  const signingOut = () => {
    signOut(auth)
      .then(() => {
        changeUserState(false);
        console.log(" user signed out!");
      })
      .catch((error) => {
        console.log("signing out error!!!! error: ", error);
      });
  };
  return (
    <button id="sing-out-btn" className="auth-btn" onClick={signingOut}>
      გასვლა
    </button>
  );
};

export default SignOut;
