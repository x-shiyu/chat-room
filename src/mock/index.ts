import { mock } from "mockjs";

export function mockChatRooms(): Promise<{ data: any[] }> {
  return Promise.resolve(
    mock({
      "data|3-5": [
        {
          id: "@word(5)",
          name: "@cname()",
        },
      ],
    })
  );
}

export function mockChatList(
  target_name: string | null
): Promise<{ data: any[] }> {
  if (target_name === null) {
    return Promise.reject();
  }
  return Promise.resolve(
    mock({
      "data|5-10": [
        {
          id: Math.random() > 0.5 ? "yu" : target_name,
          msg: "@cword(6,20)",
          time: "@datetime",
        },
      ],
    })
  );
}
