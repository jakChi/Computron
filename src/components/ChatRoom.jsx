/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  Timestamp,
} from "firebase/firestore";

const ChatRoom = ({ app, auth }) => {
  const dataBase = getFirestore(app);

  const dummy = useRef();
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState("");

  useEffect(() => {
    const messagesQuery = query(
      collection(dataBase, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => doc.data());
      setMessages(newData);
      console.log("Current messages: ", messages);
    });

    return unsubscribe;
  }, []);

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
      <section className="chat-section">
        {messages.map((doc) => (
          <ChatMessage key={doc.id} message={doc} auth={auth} />
        ))}
        <span ref={dummy}></span>
      </section>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="აქ უნდა ჩაწეროო! ✏️"
        />
        <button type="submit" disabled={!formValue}>
          ✈️
        </button>
      </form>
    </>
  );
};

export default ChatRoom;
