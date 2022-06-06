import { useState } from "react";
import { Preview } from "../../components/Preview";
import { ChangelogForm } from "../../components/ChangelogForm";
import { typeOptions } from "../../utils/options";

function Home() {
  const [changelog, setChangelog] = useState({
    type: typeOptions[0].value,
    title: "",
    description: "",
    prLink: "",
    taskLink: "",
  });

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl lg:text-5xl font-bold underline text-red-500 p-10">
        ChangeLogger
      </h1>
      <div className="w-full flex flex-col md:flex-row gap-1 md:px-2">
        <ChangelogForm changelog={changelog} setChangelogFn={setChangelog} />
        <Preview changelog={changelog} />
      </div>
    </div>
  );
}

export default Home;
