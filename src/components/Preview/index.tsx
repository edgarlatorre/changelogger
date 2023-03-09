import { toHTML } from "slack-markdown";
import { ReactComponent as CopyIcon } from "../../assets/icons/copy.svg";
import { Changelog } from "../../types/changelog";
import { replaceUrl } from "../../utils/converter";
import "../../styles/preview.css";
import { PRSPreview } from "../PRSPreview";
import { Description } from "./Description";

export const Preview = (props: { changelog: Changelog }) => {
  const { changelog } = props;
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
    <div className="flex flex-col w-full border-2 rounded px-2">
      <h5 className="self-center text-lg underline">Preview</h5>
      {changelog.title ? (
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
              __html: `<p>${toHTML(changelog.type)}: <strong>${changelog.title}</strong></p>`,
            }}
          ></div>
        ) : null}
        <br />
        {changelog.problem ? (
          <>
            <Description title="Problem" emoji="sweat_smile" content={changelog.problem} extraTitle="Before this"/>
            <br />
          </>
        ) : null}
        {changelog.benefits ? (
          <>
            <Description title="Benefits" emoji="heart_eyes" content={changelog.benefits} extraTitle="After this" />
            <br />
          </>
        ) : null}
        {changelog.solution ? (
          <>
            <Description title="Solution" emoji="gear" content={changelog.solution} extraTitle="How it works"/>
            <br />
          </>
        ) : null}
        {changelog.launchStrategy ? (
          <>
            <Description title="Go-to-market" emoji="earth_africa" content={changelog.launchStrategy} extraTitle="Launch strategy"/>
            <br />
          </>
        ) : null}
        {changelog.taskLink ? (
          <div
            dangerouslySetInnerHTML={{
              __html: `:link: ${toHTML(
                `<${changelog.taskLink}|Related Task>`
              )}`,
            }}
          ></div>
        ) : null}
        {<PRSPreview prs={changelog.prs} />}
      </div>
    </div>
  );
};
