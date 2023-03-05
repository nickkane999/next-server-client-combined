import Link from "next/link";

export default function Home() {
  return (
    <>
      <main>
        <div className="container">
          <h1>MongoDB Functionality</h1>
          <ul>
            <li>
              <Link href="/mongoDB/crud">CRUD functionality</Link>
            </li>
            <li>
              <Link href="/mongoDB/scripts">Sample Scripts</Link>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}
