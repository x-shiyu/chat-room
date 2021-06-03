import { useEffect, useState } from "react";
export interface LoadingProps {
  Child?: any;
  http?: Promise<any>;
  fallback: any;
}
export default function Loading({ Child, http, fallback }: LoadingProps) {
  let [loading, setLoading] = useState(true);
  let [remoteData, setData] = useState({});
  useEffect(() => {
    if (http) {
      setLoading(true);
      http
        .then((data) => {
          setLoading(false);
          setData(data.data);
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [http]);
  return loading ? fallback : <Child data={remoteData} />;
}
