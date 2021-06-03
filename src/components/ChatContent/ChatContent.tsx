/** @jsxImportSource @emotion/react */
import ChatContentView from "@@/ChatContent/ChatContentView";
import ChatContentInput from "@@/ChatContent/ChatContentInput";
import { chatBox } from "@@/ChatContent/ChatContentCss";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { originTestData } from "@/atoms/testDataState";
import { originDataId } from "@/selectors/testDataId";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
export default function ChatContent() {
  let { id } = useParams<{ id: string }>();
  let [_, setOriginData] = useRecoilState(originTestData);

  let resetData = useResetRecoilState(originTestData);
  let data = useRecoilValue(originDataId(Number(id)));
  let location = useLocation();

  useEffect(() => {
    setOriginData(data.data);
  }, [id]);
  useEffect(() => {
    return () => {
      resetData();
    };
  }, [location.pathname]);
  return (
    <section css={chatBox}>
      <div className="content-box">
        <ChatContentView />
      </div>
      <div className="input-box">
        <ChatContentInput />
      </div>
    </section>
  );
}
