import { Input } from "../../components/form/Input";
import { Select } from "../../components/form/Select";
import { TextArea } from "../../components/form/TextArea";
import { typeOptions } from "../../utils/options";
import { Changelog } from "../../types/changelog";
import "../../components/form/Form.css";

export const ChangelogForm = (props: {
  changelog: Changelog;
  setChangelogFn: Function;
}) => {
  const { changelog, setChangelogFn } = props;

  return (
    <form className="rounded px-8 pt-6 border-2 pb-8 w-full">
      <Select
        params={{
          name: "type",
          label: "Type",
          options: typeOptions,
          onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) =>
            setChangelogFn({ ...changelog, type: e.target.value }),
        }}
      />
      <Input
        params={{
          name: "title",
          label: "Title",
          onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) =>
            setChangelogFn({ ...changelog, title: e.target.value }),
        }}
      />
      <Input
        params={{
          name: "taskLink",
          label: "Related Task",
          onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) =>
            setChangelogFn({ ...changelog, taskLink: e.target.value }),
        }}
      />
      <Input
        params={{
          name: "prLink",
          label: "Related PR",
          onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) =>
            setChangelogFn({ ...changelog, prLink: e.target.value }),
        }}
      />
      <TextArea
        params={{
          name: "description",
          label: "Description",
          onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) =>
            setChangelogFn({ ...changelog, description: e.target.value }),
        }}
      />
    </form>
  );
};
