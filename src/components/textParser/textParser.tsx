/* parse string with html formatting tags and replace them with a real react element that can be rendered */
export const ConvertText = ({ text }: { text: string }) => {
  const parseNestedTags = (content: string): React.ReactNode[] => {
    const regex =
      /<(\/?(?:a|b|strong|i|em|mark|small|del|ins|sub|sup))(\s+[^>]*?)?>(.*?)<\/\1>/gi;
    let match;
    let lastIndex = 0;
    const elements: React.ReactNode[] = [];

    while ((match = regex.exec(content))) {
      const matchIndex = match.index;
      const matchText = match[0];
      const plainText = content.substring(lastIndex, matchIndex);

      if (plainText) {
        elements.push(plainText);
      }

      const tag = match[1];
      const attributes = match[2] || "";
      const nestedContent = match[3];

      const styleMatch = attributes.match(/style\s*=\s*(['"])(.*?)\1/i);
      const styleString = styleMatch ? styleMatch[2] : "";
      const style = styleString ? parseInlineStyles(styleString) : {};

      switch (tag) {
        case "a":
          const hrefMatch = attributes.match(/href\s*=\s*(['"])(.*?)\1/i);
          const href = hrefMatch ? hrefMatch[2] : "";

          elements.push(
            <a key={matchIndex} href={href} style={style}>
              {parseNestedTags(nestedContent)}
            </a>
          );
          break;
        case "b":
        case "strong":
          elements.push(
            <b key={matchIndex} style={style}>
              {parseNestedTags(nestedContent)}
            </b>
          );
          break;
        case "i":
        case "em":
          elements.push(
            <i key={matchIndex} style={style}>
              {parseNestedTags(nestedContent)}
            </i>
          );
          break;
        case "mark":
          elements.push(
            <mark key={matchIndex} style={style}>
              {parseNestedTags(nestedContent)}
            </mark>
          );
          break;
        case "small":
          elements.push(
            <small key={matchIndex} style={style}>
              {parseNestedTags(nestedContent)}
            </small>
          );
          break;
        case "del":
          elements.push(
            <del key={matchIndex} style={style}>
              {parseNestedTags(nestedContent)}
            </del>
          );
          break;
        case "ins":
          elements.push(
            <ins key={matchIndex} style={style}>
              {parseNestedTags(nestedContent)}
            </ins>
          );
          break;
        case "sub":
          elements.push(
            <sub key={matchIndex} style={style}>
              {parseNestedTags(nestedContent)}
            </sub>
          );
          break;
        case "sup":
          elements.push(
            <sup key={matchIndex} style={style}>
              {parseNestedTags(nestedContent)}
            </sup>
          );
          break;
        default:
          elements.push(matchText);
      }

      lastIndex = matchIndex + matchText.length;
    }

    const remainingText = content.substring(lastIndex);
    if (remainingText) {
      elements.push(remainingText);
    }

    return elements;
  };

  const parseInlineStyles = (styleString: string): React.CSSProperties => {
    const styleObject: React.CSSProperties = {};
    const styles = styleString.split(";");

    styles.forEach((style) => {
      const [property, value] = style.split(":");
      const trimmedProperty = property.trim();
      const trimmedValue = value?.trim();

      if (trimmedProperty && trimmedValue) {
        // @ts-ignore "Expression produces a union type that is too complex to represent"
        styleObject[trimmedProperty as keyof React.CSSProperties] =
          trimmedValue;
      }
    });

    return styleObject;
  };

  return <span>{parseNestedTags(text)}</span>;
};
