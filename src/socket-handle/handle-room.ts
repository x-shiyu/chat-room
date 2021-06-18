export function handleRoomMsg(setChatList: any) {
  return {
    receive_msg: (response: any) => {
      setChatList(response);
    },
  };
}
