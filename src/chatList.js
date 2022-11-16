export const ChatList = ({chats}) => {
  return (
    <ul>
      {chats.map((chat, index) => {
        return (
          <div key={index}>
            <h4>{chat.username}</h4>
            <p>{chat.message}</p>
          </div>
        )
      })}
    </ul>
  )
}