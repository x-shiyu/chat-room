import ErrorBoundary from "@@/ErrorBoundry";
import { useRequest } from "ahooks";
import { getMockData } from "@/api/mock";

interface ItemData {
  id: number;
  created_at: string;
}
interface TestProps {
  data: ItemData;
}
export default function Test() {
  let { error, loading, data, run } = useRequest(getMockData);
  if (loading) {
    console.log("is-loading");
  }
  if (data) {
    console.log(data);
  }
  if (error) {
    console.log(error);
  }

  return (
    <ErrorBoundary>
      <div
        style={{
          width: 300,
          height: 300,
          overflow: "hidden",
        }}
      >
        <button onClick={() => run(1)}>click</button>
      </div>
    </ErrorBoundary>
  );
}
