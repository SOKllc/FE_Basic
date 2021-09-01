export const trim = (content) => {
  if (!content) return {};
  if (typeof content === "object") {
    Object.keys(content).map((key) => {
      let keyType = typeof content[key];
      switch (keyType) {
        case "string":
          return (content = { ...content, [key]: content[key].trim() });
        case "object":
          return (content = { ...content, [key]: { ...trim(content[key]) } });
        default:
          return (content = { ...content, [key]: content[key] });
      }
    });
  }
  return content;
};
