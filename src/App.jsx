import SignOut from "./components/SignOut";
import SignIn from "./components/SignIn";
import ChatRoom from "./components/ChatRoom";
import "./App.css";

import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
//import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSwkf7Oq_ie-V0DctI_huWfZ26SSO0rGg",
  authDomain: "computron-8fd9b.firebaseapp.com",
  projectId: "computron-8fd9b",
  storageBucket: "computron-8fd9b.appspot.com",
  messagingSenderId: "663920143379",
  appId: "1:663920143379:web:f67207e37876d0b90623e6",
  measurementId: "G-J893L8BC1D",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const App = () => {
  const [user, setUser] = useState(auth.currentUser);

  const monitorUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user has logged in!");
        setUser(user);
      } else {
        console.log("user hasn't looged in!");
        setUser(null);
      }
    });
  };

  useEffect(() => {
    monitorUser();
  }, []);

  return (
    <div className="App">
      <header>
        <h1 className="title">Computron</h1>
        {user ? (
          <SignOut auth={auth} changeUserState={setUser} />
        ) : (
          <SignIn auth={auth} changeUserState={setUser} />
        )}
      </header>
      <main>{user && <ChatRoom app={app} auth={auth} />}</main>
    </div>
  );
};

export default App;
