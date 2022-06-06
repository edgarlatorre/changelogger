import { useState } from "react";
import { Input } from "../../components/form/Input";
import { Select } from "../../components/form/Select";
import { Text } from "../../components/form/Text";
import { typeOptions } from "../../utils/options";
import "../../styles/preview.css";
import { Preview } from "../../components/Preview";

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
        <form className="rounded px-8 pt-6 border-2 pb-8 w-full">
          <Select
            params={{
              name: "type",
              label: "Title",
              options: typeOptions,
              onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) =>
                setChangelog({ ...changelog, type: e.target.value }),
            }}
          />
          <Input
            params={{
              name: "title",
              label: "Title",
              onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) =>
                setChangelog({ ...changelog, title: e.target.value }),
            }}
          />
          <Input
            params={{
              name: "taskLink",
              label: "Related Task",
              onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) =>
                setChangelog({ ...changelog, taskLink: e.target.value }),
            }}
          />
          <Input
            params={{
              name: "prLink",
              label: "Related PR",
              onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) =>
                setChangelog({ ...changelog, prLink: e.target.value }),
            }}
          />
          <Text
            params={{
              name: "description",
              label: "Description",
              onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) =>
                setChangelog({ ...changelog, description: e.target.value }),
            }}
          />
        </form>
        <Preview changelog={changelog} />
      </div>
    </div>
  );
}

export default Home;
