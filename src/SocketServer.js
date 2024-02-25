export default function (socket) {
  //user joins or open the application
  socket.on("join", (user) => {
    socket.join(user); //user is actually user id
  });

  //join a conversation room
  socket.on("join conversation", (conversation) => {
    socket.join(conversation); //conversation is actually conversation id
  });

  //send and receive message in realtime
  socket.on("send message", (message) => {
    let conversation = message.conversation;
    if (!conversation.users) return;
    conversation.users.forEach((user) => {
      if (user._id === message.sender._id) return;
      socket.in(user._id).emit("received message", message);
    });
  });
}
