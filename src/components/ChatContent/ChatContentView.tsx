/** @jsxImportSource @emotion/react */
import { originDataChildren } from "@/selectors/testDataId";
import { useRecoilValue } from "recoil";
import { msgLeft, msgRight, msgBox } from "./ChatContentCss";
export default function ChatContentView() {
  let children = useRecoilValue(originDataChildren) as any[];
  return (
    <div>
      <ul css={msgBox}>
        {children.map((item, index) => (
          <li key={item.id} css={index % 2 === 0 ? msgLeft : msgRight}>
            <span>{item.author.substr(0, 2)}</span>
            <p>{item.text.substr(0, 50)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
