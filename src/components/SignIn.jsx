/* eslint-disable react/prop-types */
import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";

const SignIn = ({auth, changeUserState}) => {
  const provider = new GoogleAuthProvider();

  // google sign in popup
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        changeUserState(user)
        console.log("signed in user: ", user);

        // IdP data available using getAdditionalUserInfo(result)
      })
      .catch((error) => {
        // Handle Errors here. For a list of error codes have a look at https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInWithPopup.
        const errorCode = error.code;
        console.log("errorCode: ", errorCode);

        const errorMessage = error.message;
        console.log("errorMessage: ", errorMessage);

        // The email of the user's account used.
        const email = error.customData.email;
        console.log("email: ", email);

        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("credential: ", credential);
      });
  };

  return (
    <>
      <button id="sign-in-btn" className="auth-btn" onClick={signInWithGoogle}>
        შესვლა
      </button>
    </>
  );
};

export default SignIn;
