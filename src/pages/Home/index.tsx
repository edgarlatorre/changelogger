import { useEffect, useState } from "react";
import { toHTML } from "slack-markdown";
import { Input } from "../../components/form/Input";
import { Select } from "../../components/form/Select";
import { Text } from "../../components/form/Text";
import { ReactComponent as CopyIcon } from "../../assets/icons/copy.svg";

function Home() {
  const typeOptions = [
    {
      title: "Bug",
      value: "🐛 `#fixed`",
    },
    {
      title: "Changed",
      value: "♻️ `#changed`",
    },
    {
      title: "Deprecated",
      value: "🔥 `#deprecated`",
    },
    {
      title: "Improvement",
      value: "✨ `#improvement`",
    },
    {
      title: "New",
      value: "💖 `#new`",
    },
  ];
  const [type, setType] = useState(typeOptions[0].value);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completeTitle, setCompleteTitle] = useState("");
  const [prLink, setPRLink] = useState("");
  const [taskLink, setTaskLink] = useState("");

  const generateOptions = () => {
    return typeOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.title}
      </option>
    ));
  };

  /**
   * TODO: Change this implementation to use navigator clipboard as
   * the execCommand is deprecated.
   * https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
   */
  const copyToClipboard = () => {
    if (window) {
      const selection = window.getSelection();
      const element = document.getElementById("preview");

      if (selection && element) {
        selection.removeAllRanges();
        const range = document.createRange();
        range.selectNode(element);
        selection.addRange(range);
        document.execCommand("copy");
        selection.removeAllRanges();
      }
    }
  };

  useEffect(() => {
    setCompleteTitle(`<p>${type}: <strong>${title}</strong></p>`);
  }, [title, type]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-bold underline text-red-500 p-10">
        ChangeLogger
      </h1>
      <div className="w-3/4">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <Select
            params={{
              name: "type",
              label: "Title",
              options: generateOptions(),
              onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) =>
                setType(e.target.value),
            }}
          />
          <Input
            params={{
              name: "title",
              label: "Title",
              onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value),
            }}
          />
          <Input
            params={{
              name: "taskLink",
              label: "Related Task",
              onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) =>
                setTaskLink(e.target.value),
            }}
          />
          <Input
            params={{
              name: "prLink",
              label: "Related PR",
              onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) =>
                setPRLink(e.target.value),
            }}
          />
          <Text
            params={{
              name: "description",
              label: "Description",
              onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value),
            }}
          />
        </form>
        <div className="flex flex-col">
          {description ? (
            <button
              onClick={() => copyToClipboard()}
              className="place-self-end p-2"
            >
              <CopyIcon className="w-6 h-6" />
            </button>
          ) : null}
          <div id="preview">
            {title ? (
              <div dangerouslySetInnerHTML={{ __html: completeTitle }}></div>
            ) : null}
            <br />
            <div
              dangerouslySetInnerHTML={{
                __html: toHTML(description),
              }}
            ></div>
            <br />
            {taskLink ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: `:link: ${toHTML(`<${taskLink}|Related Task>`)}`,
                }}
              ></div>
            ) : null}
            {prLink ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: `:github: ${toHTML(`<${prLink}|Related PR>`)}`,
                }}
              ></div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
