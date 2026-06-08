"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { withBasePath } from "../../lib/base-path";

// The free-downloads hub has been consolidated into the main /resources page.
// This route now redirects there so old links and bookmarks keep working.
export default function ResourcesHubRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/resources");
  }, [router]);

  return (
    <section className="section">
      <div
        className="container"
        style={{ textAlign: "center", padding: "120px 0", minHeight: "40vh" }}
      >
        <p style={{ fontSize: "1.05rem" }}>
          Redirecting to our{" "}
          <a href={withBasePath("/resources")} className="text-accent">
            Free Resources
          </a>{" "}
          page…
        </p>
      </div>
    </section>
  );
}
