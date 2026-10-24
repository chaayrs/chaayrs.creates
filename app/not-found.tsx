import Link from "next/link";
export default function NotFound() {
  return (
    <main className="not-found">
      <span className="eyebrow">404 / A LITTLE OFF SCRIPT</span>
      <h1>
        Let’s get you
        <br />
        <em>back to the creative.</em>
      </h1>
      <Link href="/" className="button button-rose">
        Back to the portfolio ↗
      </Link>
    </main>
  );
}
