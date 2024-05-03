import Link from "next/link";
import styles from "./Navigation.module.css";

export default function Navigation() {
  // ! When adding more Links pls increment CSS -> .Grid ->
  // ! grid-template-columns first param ONE for each new Link.
  return (
    <nav className="navbar bg-base-200 shadow">
      <Link href="/" className="btn btn-ghost text-xl text-primary">
        Hem
      </Link>
      <ul
        tabIndex={0}
        className="m-2 menu menu-sm mt-3 z-[1] p-2 bg-base-200 rounded-box w-52 "
      >
        <li>
          <Link href="/add" className="btn btn-ghost text-md text-primary"> Skapa nytt event</Link>
        </li>
      </ul>
    </nav>
  );
}
