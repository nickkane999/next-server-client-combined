import Link from "next/link";
import sections from "@/features/mongoDB/data/crudSections.json";

export default function Home() {
  return (
    <>
      <main>
        <div className="container">
          <h1>Create, Read, Update, Delete Functionality (CRUD)</h1>
          <ul>
            {sections.map((section) => (
              <li key={section.name}>
                <Link href={`/mongoDB/crud/${section.folder}`}>{section.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
