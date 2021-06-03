import { css } from "@emotion/react";
const msg = css`
  width: 100%;
  margin-top: 20px;
  display: flex;
`;
const msgHead = css`
  span {
    display: block;
    height: 40px;
    width: 40px;
    background-color: green;
    border-radius: 5px;
    line-height: 40px;
    font-weight: bold;
    text-align: center;
  }
`;
const msgContent = css`
  p {
    padding: 0 20px;
    text-align: left;
    max-width: 150px;
    height: auto;
    box-sizing: content-box;
  }
`;
export const msgLeft = css`
  justify-content: flex-start;
  ${msg}
  ${msgHead}
  ${msgContent}
`;

export const msgRight = css`
  flex-direction: row-reverse;
  justify-content: flex-start;
  ${msg}
  ${msgHead}
  ${msgContent}
`;

export const msgBox = css`
  width: 100%;
  padding: 0 10px;
  overflow-y: auto;
  overflow-x: visible;
  display: flex;
  flex-wrap: wrap;
`;

export const chatBox = css`
  position: relative;
  height: 100%;
  padding-bottom: 100px;
  .content-box {
  }
  .input-box {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background-color: gray;
  }
`;
