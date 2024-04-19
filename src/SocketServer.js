let onlineUsers = []; //every time onlineUsers is updated it will be send to every socket

export default function (socket, io) {
  //user joins or open the application
  socket.on("join", (user) => {
    socket.join(user); //user is actually user id

    //add joined users to onlineUsers array
    if (!onlineUsers.some((u) => u.userId === user)) {
      onlineUsers.push({ userId: user, socketId: socket.id });
    }

    //send onlineUsers array to the client
    io.emit("get online users", onlineUsers);
    //send socket id
    io.to(socket.id).emit("setup socket", socket.id);
  });

  //remove the users from the onlineUsers when user is disconnected
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((u) => u.socketId !== socket.id);

    //send onlineUsers array to the client
    io.emit("get online users", onlineUsers);
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

  //typing
  socket.on("typing", (conversation) => {
    console.log(`typing in ${conversation}`);
    socket.in(conversation).emit("typing", conversation);
  });
  socket.on("stop typing", (conversation) => {
    console.log(`stop typing in ${conversation}`);
    socket.in(conversation).emit("stop typing");
  });

  //call
  socket.on("call user", (data) => {
    let userId = data.userToCall;
    let userSocketId = onlineUsers.find((user) => user.userId == userId);
    io.to(userSocketId.socketId).emit("friend calling", {
      signal: data.signal,
      from: data.from,
      name: data.name,
      picture: data.picture,
    });
  });

  socket.on("answer call", (data) => {
    io.to(data.respondingTo).emit("call accepted", data.signal);
  });

  socket.on("end call", (data) => {
    let { userIdOfUserToRespond, socketIdOfUserToRespond } = data;
    if (userIdOfUserToRespond) {
      let userId = userIdOfUserToRespond;
      let userSocketId = onlineUsers.find((user) => user.userId == userId);
      io.to(userSocketId.socketId).emit("end call");
    } else {
      io.to(socketIdOfUserToRespond).emit("end call");
    }
  });
}
