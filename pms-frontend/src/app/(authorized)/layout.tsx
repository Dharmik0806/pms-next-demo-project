// Layout for all private pages. `robots: noindex` keeps them out of Google.
import type { Metadata } from "next";
import { AuthGuard } from "./auth-guard";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthorizedLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
