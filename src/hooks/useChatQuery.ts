import { useQuery } from "@/hooks/useQuery";

export default function useChatQuery() {
  let query = useQuery();
  return {
    id: query.get("contact"),
  };
}
