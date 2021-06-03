import { Button } from "antd";
import { query } from "@/atoms/testDataState";
import { useRecoilState } from "recoil";

export default function ChatContentInput() {
  let [_, setQuery] = useRecoilState(query);
  return (
    <div>
      <Button type="primary" onClick={() => setQuery({ id: 4 })}>
        发送
      </Button>
    </div>
  );
}
