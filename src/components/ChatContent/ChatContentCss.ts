import { css } from "@emotion/react";
const msg = css`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
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
    color: #fff;
  }
`;
const msgContent = css`
  p {
    padding: 0 20px;
    text-align: left;
    max-width: 150px;
    box-sizing: content-box;
  }
`;
export const msgLeft = css`
  ${msg}
  ${msgHead}
  ${msgContent}
`;

export const msgRight = css`
  flex-direction: row-reverse;
  ${msg}
  ${msgHead}
  ${msgContent}
`;

export const msgBox = css`
  width: 100%;
  padding: 0 10px 40px 0;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
`;

export const chatBox = css`
  position: relative;
  height: 100%;
  padding-bottom: 100px;
  .content-box {
    overflow: hidden;
    height: 100%;
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

export const chatInput = css`
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 40px;
  .send {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  textarea {
    height: 100%;
    resize: none;
    overflow-y: auto;
  }
`;
