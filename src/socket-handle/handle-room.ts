export function receive_msg(setChatList: any) {
  return (response: any) => {
    setChatList(response);
  };
}
