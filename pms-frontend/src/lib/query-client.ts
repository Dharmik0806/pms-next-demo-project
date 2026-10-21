// Creates the TanStack Query client with sensible defaults.
import { QueryClient } from "@tanstack/react-query";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000, // data is "fresh" for 30s → fewer refetches
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
}
