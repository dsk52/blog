import MarkdownIt from "markdown-it";
import prism from "markdown-it-prism";

const md: MarkdownIt = new MarkdownIt({
  html: true,
  breaks: true,
  typographer: true,
  linkify: true,
  langPrefix: "language-",
});

md.use(prism, {
  highlightInlineCode: true,
  defaultLanguage: "bash",
});

export { md };
