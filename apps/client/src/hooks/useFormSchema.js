import { useEffect, useState } from "react";

export function useFormSchema(formId) {
  const [schema, setSchema] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/schemas/${formId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Schema fetch failed: ${res.status}`);
        return res.json();
      })
      .then((data) => { if (!cancelled) setSchema(data); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [formId]);

  return { schema, loading, error };
}