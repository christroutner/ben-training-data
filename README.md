# Ben Training Data

This repository contains raw data for uploading to a RAG database used by the tech support chat bot [Ben-AI](https://github.com/christroutner/ben-ai-v3).

The data is generated from collections of code, blog posts, documentation, etc., and it's focused on the subjects of Bitcoin, Bitcoin Cash, JavaScript, and the [Cash Stack](https://cashstack.info).

- Code is converted to Markdown by using [code2prompt](https://github.com/mufeedvh/code2prompt).
- Web page data is converted to Markdown, using [percollate](https://github.com/danburzo/percollate).
- Large AI like [Gemini](https://gemini.google.com/) (with a large context window) is used to break down large documents into smaller markdown documents.

## Contribution Guidelines

All data should be formatted as a [Markdown](https://www.markdownguide.org/basic-syntax/) document. The ideal length is 2-3 paragraphs. Larger documents should be pre-processed by using [these prompts](./knowledge/shared/websites/prompts.md) to break them down.

**Please contribute additional data on the subjects of Bitcoin Cash and JavaScript to make the bot more helpful!**

## Directory Structure

- Raw data is contained in the [knowledge/shared](./knowledge/shared) directory.
- The `old` directory contains the following old code:
  - Code for uploading data to the [Chroma RAG database](https://github.com/christroutner/chroma-rag) is in the [chroma-rag](./chroma-rag) directory. This was for v1.1.0 of [ben-ai-v3](https://github.com/christroutner/ben-ai-v3)
  - The `eliza-v0.5` and `elize-v1.0` directories are early prototypes. They are no longer used. They were for versions prior to v1 of ben-ai-v3.

## License
[MIT](./LICENSE.md)