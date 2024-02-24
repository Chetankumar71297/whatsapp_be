export default function (socket) {
  //user joins or open the application
  socket.on("join", (user) => {
    socket.join(user); //user is actually user id
  });

  //join a conversation room
  socket.on("join conversation", (conversation) => {
    socket.join(conversation); //conversation is actually conversation id
  });
}
