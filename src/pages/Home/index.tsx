import { useState } from "react";
import { toHTML } from "slack-markdown";
import { Input } from "../../components/form/Input";
import { Select } from "../../components/form/Select";
import { Text } from "../../components/form/Text";
import { ReactComponent as CopyIcon } from "../../assets/icons/copy.svg";
import { typeOptions } from "../../utils/options";
import "../../styles/preview.css";

function Home() {
  const [changelog, setChangelog] = useState({
    type: typeOptions[0].value,
    title: "",
    description: "",
    prLink: "",
    taskLink: "",
  });

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
        <div className="flex flex-col w-full border-2 rounded px-2">
          <h5 className="self-center text-lg underline">Preview</h5>
          {changelog.description ? (
            <button
              onClick={() => copyToClipboard()}
              className="place-self-end p-2"
            >
              <CopyIcon className="w-6 h-6" />
            </button>
          ) : null}
          <div id="preview" className="preview">
            {changelog.title ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: `<p>${changelog.type}: <strong>${changelog.title}</strong></p>`,
                }}
              ></div>
            ) : null}
            <br />
            <div
              dangerouslySetInnerHTML={{
                __html: toHTML(changelog.description),
              }}
            ></div>
            <br />
            {changelog.taskLink ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: `:link: ${toHTML(
                    `<${changelog.taskLink}|Related Task>`
                  )}`,
                }}
              ></div>
            ) : null}
            {changelog.prLink ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: `:github: ${toHTML(
                    `<${changelog.prLink}|Related PR>`
                  )}`,
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
