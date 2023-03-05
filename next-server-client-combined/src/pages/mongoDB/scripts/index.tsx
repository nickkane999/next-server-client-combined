import React, { useEffect, useState } from "react";
import ProcessFile from "@/features/mongoDB/scripts/processFile";
import ProcessFiles from "@/features/mongoDB/scripts/processFiles";

const components: any = {
  processFile: <ProcessFile />,
  processFiles: <ProcessFiles />,
};

const Scripts = () => {
  const [displayedSection, setDisplayedSection] = useState("");

  return (
    <main>
      <div className="container">
        <h1>Run Scripts</h1>
        <h2>Select a script</h2>
        <select value={displayedSection} onChange={(e) => setDisplayedSection(e.target.value)}>
          <option value="">Select an option</option>
          {Object.keys(components).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        {displayedSection && <h2>Script parameters</h2>}
        {components[displayedSection]}
      </div>
    </main>
  );
};

export default Scripts;
