/* eslint-disable react/prop-types */
import { signOut } from "firebase/auth";

const SignOut = ({ auth }) => {
  const signingOut = () => {
    signOut(auth)
      .then(() => {
        console.log(" user signed out!");
      })
      .catch((error) => {
        console.log("signing out error!!!! error: ", error);
      });
  };
  return (
    <button className="btn" onClick={signingOut}>
      გამოსვლა
    </button>
  );
};

export default SignOut;