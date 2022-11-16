export const ChatBox = ({handleTextChange, text, username, sendMessage}) => {
  return (
    <div>
      <input
        placeholder={'Write message'}
        type={'text'}
        onChange={handleTextChange}
        value={text}
      />
      <button onClick={sendMessage}>Send</button>
      <h4>It's {username}</h4>
    </div>
  )
}