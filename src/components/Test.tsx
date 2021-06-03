import ErrorBoundary from "@@/ErrorBoundry";

interface ItemData {
  id: number;
  created_at: string;
}
interface TestProps {
  data: ItemData;
}
export default function Test({ data }: TestProps) {
  return (
    <ErrorBoundary>
      <div
        style={{
          width: 300,
          height: 300,
          overflow: "hidden",
        }}
      >
        {data.created_at}
      </div>
    </ErrorBoundary>
  );
}
