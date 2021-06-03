import { css } from "@emotion/react";

export const layoutBox = css`
  display: flex;
  width: 800px;
  border-radius: 10px;
  border: 1px solid #000;
  height: 600px;
  margin: 50px auto;
  position: relative;
  padding-left: 200px;
`;

export const layoutNav = css`
  width: 200px;
  background: green;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
`;

export const layoutMain = css`
  width: 100%;
  height: 100%;
  display: flex;
`;
