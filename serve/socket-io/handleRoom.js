const { redisRPush } = require("../config/db");
const { getChatList } = require("../utils/chats");
const { verify } = require("../utils/token");
const { v4: uuidv4 } = require("uuid");
module.exports = async function handleRoom(socket) {
    let { nsp, handshake } = socket;
    let [_, roomId] = nsp.name.match(/^\/socket\/room\/(\d+)$/);
    let { auth } = handshake;
    let { name,id: userId } = await verify(auth.token);

    console.log(name + "--->" + roomId);
    socket.join('room_' + roomId)
    
    // socket.on("add_msg", async (msg) => {
    //     try {
    //         let id = uuidv4();
    //         let time = Date.now();
    //         let msgInfo = {
    //             id,
    //             msg,
    //             name: name,
    //             userId,
    //             time,
    //         };
    //         await redisRPush("room_" + roomId, JSON.stringify(msgInfo));
    //         socket.to(roomId).emit("receive_msg", msgInfo);
    //         socket.emit("receive_msg", msgInfo)
    //     } catch (err) {
    //         socket.emit("add_msg", false);
    //     }
    // });



}