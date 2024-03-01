import { useRef, useState } from "react";
import { getFirestore, orderBy } from "firebase/firestore";
import ChatMessage from "./ChatMessage";
import {
  collection,
  getDocs,
  query,
  addDoc,
  Timestamp,
} from "firebase/firestore";

const ChatRoom = ({ app, auth }) => {
  const dataBase = getFirestore(app)

  const dummy = useRef();
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState("");

  const getMessages = async () => {
    const messagesQuery = query(collection(dataBase, "messages"), orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(messagesQuery);

    setMessages(querySnapshot.docs.map((doc) => doc.data()));

    console.log("querySnapshot has called: ", querySnapshot);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }

  //sending messages function
  const sendMessage = async (e) => {
    e.preventDefault(); // es ro movacalo ra moxdeba?
    const { uid, photoURL } = auth.currentUser;

    const docRef = await addDoc(collection(dataBase, "messages"), {
      text: formValue,
      createdAt: Timestamp.fromDate(new Date()),
      uid,
      photoURL,
    });
    console.log("document added with ID: ", docRef.id);

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages.map((doc) => (
          <ChatMessage key={doc.id} message={doc} auth={auth} />
        ))}
        <span ref={dummy}></span>
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="აქ უნდა ჩაწეროო! ✏️"
        />
        <button type="submit" disabled={!formValue} onClick={getMessages}>
          ✈️
        </button>
      </form>
    </>
  );
};

export default ChatRoom;
