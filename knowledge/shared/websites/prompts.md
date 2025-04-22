# Pre-Processing Prompts

These prompts are used by large AI (like [Gemini](https://gemini.google.com/)) to convert large documents into a series of 2-3 paragraph summaries.

---

# Task: Summarize Technical Content

Below is a chapter from a technical book. Your task is to rewrite the text below the horizontal line, while following the guidelines immediately below this sentence.

## Writing Guidelines

- The output format should be in Markdown.
- Do not make a 'Introduction', 'Conclusion', or 'Summary' chapter. The chapters should only cover the primary concepts in the content.
- Separate each chapter by a Markdown horizontal bar: '-----'.
- Separate the concepts in the content into mini-chapters.
- The ideal number of chapters is 10. Use less if it feels like it doesn't fit well to use 10. If there are less than 5 chapters, think hard about how to create at least 5 chapters. Use more than 10 if there are simply too many concepts to cover in 10 chapters.
- Each chapter should ideally be 2-3 paragraphs. Use more if needed to capture the essential technical details from the original source. Feel free to use JavaScript code example code where appropriate. Any code, ascii tables, or ascii diagrams do not count against the number of paragraphs.
- The audience for this content is technical. It is not for non-technical readers.
- Do your best not to lose any technical details described in the original content.
- It's really important to preserve technical details and facts from the original content. It is okay to violate the writing guidelines in order to preserve technical details and facts.
- Do not waste space with an introduction or summary for each chapter. Just present the core content.
- The output will be used as reference material, so a preface or conclusion to content is not useful.
