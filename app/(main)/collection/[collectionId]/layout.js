import Link from "next/link";
import { Suspense } from "react";
import { BarLoader } from "react-spinners";

export default function WriteLayout({ children }) {
  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="text-sm text-brown-500 hover:text-brown-700 cursor-pointer"
        >
          ← Back to Dashboard
        </Link>
      </div>
      <Suspense fallback={<BarLoader color="brown" width={"100%"} />}>
        {children}
      </Suspense>
    </div>
  );
}