import { useState, useCallback } from "react";

const useLoading = () => {
  const [loading, setLoading] = useState(false);

  const showLoading = useCallback(() => setLoading(true), []);
  const hideLoading = useCallback(() => setLoading(false), []);

  return { loading, showLoading, hideLoading };
};

export default useLoading;
