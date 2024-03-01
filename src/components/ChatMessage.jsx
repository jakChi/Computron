/* eslint-disable react/prop-types */

const ChatMessage = (props) => {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === props.auth.currentUser.uid ? "sent" : "received";

  return (
    <div className="chat-message">
      <p className={`uid ${messageClass}`}>
        {messageClass === "received" ? uid : null}
      </p>
      <div className={`message ${messageClass}`}>
        <img src={photoURL} alt="User" />
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
