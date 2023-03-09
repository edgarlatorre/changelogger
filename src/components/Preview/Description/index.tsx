import Emoji from "react-emoji-render";
import { toHTML } from "slack-markdown";
import { replaceUrl } from "../../../utils/converter";

type DescriptionProps = {
  emoji?: string;
  title: string;
  content: string;
  extraTitle?: string 
};

export const Description = (props: DescriptionProps) => {
  const { emoji, title, content, extraTitle } = props;

  return (
    <div className="flex flex-col gap-4">
      <p>
        { emoji ? (<Emoji>{`:${emoji}:  `}</Emoji>) : null}
        
        { extraTitle ? (
          <span><strong>{title}</strong> | <em>{extraTitle}</em></span>
          ) : null}
      </p>
      <div dangerouslySetInnerHTML={{__html: toHTML(replaceUrl(content)),}}></div>
    </div>
  );
};