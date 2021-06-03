import { css } from "@emotion/react";

export const listItem = css`
  li {
    a {
      display: block;
      padding: 10px;
      margin-top: 10px;
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
