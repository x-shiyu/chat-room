import { css } from "@emotion/react";

export const listItem = css`
  li {
    margin-top: 10px;
    text-align: center;
    a {
      display: block;
      padding: 10px;
      background: yellow;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
      &:hover {
        background: lightcoral;
        color: yellow;
      }
    }
  }
`;

export const userBox = css`
  text-align: center;
  font-size: 20px;
  color: #fff;
  height: 60px;
  line-height: 60px;
`;

export const remarkBox = css`
  padding-top: 20px;
  display: flex;
  p {
    flex: 1;
  }
  textarea {
    flex: 9;
  }
`;
