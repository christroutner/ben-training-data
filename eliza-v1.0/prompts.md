# Prompts

This is a collection of prompts I'm using to have AI models like ChatGPT, Claud, or DeepSeek to summarize technical content into 2-3 paragraph summaries. These little knowledge 'snippets' are much more efficient for an AI Agent (like Ben) to retrieve knowledge from their RAG database.

To do this work, you need an LLM with a really big context window. I'm using the `deepseek-r1:8b` model, self-hosted using Ollama. It has a context window of 32k tokens.

-----



# Task: Summarize Technical Content

Below is a chapter from a technical book. Your task is to rewrite the text below the horizonal line, while following the guidelines immediately below this sentance.

## Writing Guidelines

- The output format should be in Markdown. 
- Do not make a 'Introduction', 'Conclusion', or 'Summary' chapter. The chapters should only cover the primary concepts in the content.
- Separate each chapter by a Markdown horizontal bar: '-----'.
- Separate the concepts in the content into mini-chapters. 
- The ideal number of chapters is 10. Use less if it feels like it doesn't fit well to use 10. If there are less than 5 chapters, think hard about how to create at least 5 chapters. Use more than 10 if there are simply too many concepts to cover in 10 chapters.
- Each chapter should ideally be 2-3 paragraphs. Use more if needed to capture the essential technical details from the original source. Feel free to use JavaScript code example code where appropriate. The code does not count against the number of paragraphs. 
- The audience for this content is technical. It is not for non-technical readers.
- Do your best not to lose any technical details described in the original content.
- It's really important to preserve technical details and facts from the original content. It is okey to violate the writing guidelines in order to preserve technical details and facts.


-----

<Text Here>

-----

# Task: Summarize Technical Content

Above was a chapter from a technical book. Your task is to rewrite the text above the horizonal line, while following the guidelines immediately below this sentance.

## Writing Guidelines

- The output format should be in Markdown. 
- Do not make a 'Introduction', 'Conclusion', or 'Summary' chapter. The chapters should only cover the primary concepts in the content.
- Separate each chapter by a Markdown horizontal bar: '-----'.
- Separate the concepts in the content into mini-chapters. 
- The ideal number of chapters is 10. Use less if it feels like it doesn't fit well to use 10. If there are less than 5 chapters, think hard about how to create at least 5 chapters. Use more than 10 if there are simply too many concepts to cover in 10 chapters.
- Each chapter should ideally be 2-3 paragraphs. Use more if needed to capture the essential technical details from the original source. Feel free to use JavaScript code example code where appropriate. The code does not count against the number of paragraphs. 
- The audience for this content is technical. It is not for non-technical readers.
- Do your best not to lose any technical details described in the original content.
- It's really important to preserve technical details and facts from the original content. It is okey to violate the writing guidelines in order to preserve technical details and facts.