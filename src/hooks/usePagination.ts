import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { paginate, parsePage } from "../utils/pagination";

/**
 * Client-side pagination whose current page lives in the URL (?page=2),
 * so a refresh or a shared link lands on the same page.
 * Other query params (such as ?category=) are preserved.
 */
export function usePagination<T>(items: T[] | null, pageSize: number) {
  const [params, setParams] = useSearchParams();
  const requestedPage = parsePage(params.get("page"));

  const view = useMemo(
    () => (items ? paginate(items, requestedPage, pageSize) : null),
    [items, requestedPage, pageSize],
  );

  const goToPage = useCallback(
    (next: number, replace = false) => {
      setParams(
        (prev) => {
          const nextParams = new URLSearchParams(prev);
          if (next <= 1) nextParams.delete("page");
          else nextParams.set("page", String(next));
          return nextParams;
        },
        { replace },
      );
    },
    [setParams],
  );

  // ?page=99 is rewritten to the last real page without adding a history entry.
  useEffect(() => {
    if (view && view.page !== requestedPage) goToPage(view.page, true);
  }, [view, requestedPage, goToPage]);

  return { view, goToPage };
}
