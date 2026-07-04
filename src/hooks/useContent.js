import { useState, useEffect } from "react";

const cache = {};

export function useContent(page) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cache[page]) {
      setData(cache[page]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`/api/content?page=${page}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.data) {
          cache[page] = json.data;
          setData(json.data);
        } else {
          setData(null);
        }
      })
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [page]);

  return { data, loading };
}
