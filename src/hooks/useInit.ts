import { useRecoilState } from "recoil";
import { AtomChatRoom, AtomContacts } from "@/atoms/ChatInfo";
import { AtomReceivedContacts, AtomUserInfo } from "@/atoms/AuthStatus";
import { useEffect } from "react";
import { getContacts, getAllRoomList,getReceivedContacts } from "@/api/chat";
import { getUserInfo } from "@/api/auth";
import { AtomLogin } from "@/atoms/AuthStatus";
import { AtomSockets } from "@/atoms/Sockets";
import { createQuerySocket } from "@/utils/socket-io";
import { mapAdd } from "@/utils";


export default function useInit() {
  let [_, setChatRoom] = useRecoilState(AtomChatRoom);
  let [__, setContacts] = useRecoilState(AtomContacts);
  let [userInfo, setUserInfo] = useRecoilState(AtomUserInfo);
  let [originContacts,setNewContacts] = useRecoilState(AtomReceivedContacts)
  let [isLogin] = useRecoilState(AtomLogin);

  const [sockets,setSockets] = useRecoilState(AtomSockets)

  useEffect(() => {
    if (isLogin) {
      Promise.all([getAllRoomList(), getUserInfo(), getContacts(),getReceivedContacts()]).then(
        ([rooms, userInfo, contacts,newContacts]) => {
          
          let socket = createQuerySocket('/',{
            receive_contact(data:any){
              setNewContacts([...originContacts,data])
            }
          })  

          setSockets(mapAdd(sockets,'user_'+userInfo.id,socket))

          setNewContacts(newContacts)
          setChatRoom(rooms);
          setContacts(contacts);
          setUserInfo({
            ...userInfo,
          });
        }
      );
    }
  }, [isLogin]);

  return {
    userInfo,
    isLogin,
  };
}
