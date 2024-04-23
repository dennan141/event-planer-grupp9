import Link from "next/link";
import styles from "./Navigation.module.css"

export default function Navigation() {
  return (
    <nav className={styles.grid}>
      <Link href="/" className={styles.card}>
        <h2>
          Hem<span>-&gt;</span>
        </h2>
        <p>Find in-depth information about Next.js features and API.</p>
      </Link>
      <Link href="/test" className={styles.card}>
        <h2>
          Test<span>-&gt;</span>
        </h2>
        <p>Test Test Test Test</p>
      </Link>
    </nav>
  );
}
