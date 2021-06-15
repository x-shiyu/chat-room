import { css } from "@emotion/react";

export const listItem = css`
  border-right: 1px solid #000;
  height: 100%;
  li {
    margin-bottom: 10px;
    padding: 20px;
    cursor: pointer;
    &:hover {
      background-color: green;
      color: yellow;
    }
  }
`;

export const itemActive = css`
  background-color: green;
  color: yellow;
`;
