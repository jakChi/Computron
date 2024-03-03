/* eslint-disable react/prop-types */

const ChatMessage = (props) => {
  const { text, uid, photoURL, createdAt } = props.message;

  const date = new Date(createdAt * 1000).toLocaleString("ka-ge", {
    timeStyle: "short",
    hour12: false,
  });

  const messageClass = uid === props.auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <div id="msg-hidden-info">
        <p id="msg-date">sent at: {date}</p>
      </div>
      <img src={photoURL} alt="User" />
      <p id="text">{text}</p>
    </div>
  );
};

export default ChatMessage;
