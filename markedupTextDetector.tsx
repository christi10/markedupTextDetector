const transformLabel = (label: string) => {
  const regex = /<([^>]+)>([^<]+)<\/[^>]+>|([^<]+)/g;
  let match;
  const result = [];

  while ((match = regex.exec(label)) !== null) {
    if (match[1]) {
      const markupTypeString = match[1];
      const markupType = markupTypeString.split(' ')[0];
      const taggedText = match[2];
      const regexAttributes = /(\w+):\s*(?:"([^"]*)"|(\S+))/g;
      let attributes: { [key: string]: string } = {};
      let attr;

      while ((attr = regexAttributes.exec(markupTypeString))) {
        if (attr[1] !== undefined) {
          attributes[attr[1]] = attr[3] || attr[2];
        }
      }
      result.push({
        text: taggedText,
        tag: markupType,
        attributes: attributes,
      });
    } else {
      const plainText = match[3];
      result.push({
        text: plainText,
        tag: 'PLAIN_TEXT',
        attributes: {},
      });
    } 
  }

  console.log(result);
  return result;
};

export default transformLabel;
