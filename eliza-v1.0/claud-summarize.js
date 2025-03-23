/*
  This script is a prototype for using OpenAI to summarize technical content
  into 2-3 paragraph summaries.

  This script also assumes your Anthropic API key is loaded into the environment variable
  ANTHROPIC_API_KEY.
*/


import fs from 'fs';
import Anthropic from "@anthropic-ai/sdk";


const bookTitle = `mastering-bitcoin-cash`
const chapterTitle = `transactions`

const anthropic = new Anthropic({
  // defaults to process.env["ANTHROPIC_API_KEY"]
  // apiKey: "my_api_key",
});

const headerPrompt = `
# Task: Summarize Technical Content

Below is a chapter from a technical book. Your task is to rewrite the text below the horizonal line, while following the guidelines immediately below this sentance.

## Writing Guidelines

- The output format should be in Markdown. 
- Do not make a 'Introduction', 'Conclusion', or 'Summary' chapter. The chapters should only cover the primary concepts in the content.
- Separate each chapter by a Markdown horizontal bar: '-----'.
- Separate the concepts in the content into mini-chapters. 
- The ideal number of chapters is 10. Use less if it feels like it doesn't fit well to use 10. If there are less than 5 chapters, think hard about how to create at least 5 chapters. Use more than 10 if there are simply too many concepts to cover in 10 chapters.
- Each chapter should ideally be 2-3 paragraphs. Use more if needed to capture the essential technical details from the original source. Feel free to use JavaScript code example code where appropriate. Any code, ascii tables, or ascii diagrams do not count against the number of paragraphs. 
- The audience for this content is technical. It is not for non-technical readers.
- Do your best not to lose any technical details described in the original content.
- It's really important to preserve technical details and facts from the original content. It is okey to violate the writing guidelines in order to preserve technical details and facts.


-----
`

const footerPrompt = `
-----

# Task: Summarize Technical Content

Above was a chapter from a technical book. Your task is to rewrite the text above the horizonal line, while following the guidelines immediately below this sentance.

## Writing Guidelines

- The output format should be in Markdown. 
- Do not make a 'Introduction', 'Conclusion', or 'Summary' chapter. The chapters should only cover the primary concepts in the content.
- Separate each chapter by a Markdown horizontal bar: '-----'.
- Separate the concepts in the content into mini-chapters. 
- The ideal number of chapters is 10. Use less if it feels like it doesn't fit well to use 10. If there are less than 5 chapters, think hard about how to create at least 5 chapters. Use more than 10 if there are simply too many concepts to cover in 10 chapters.
- Each chapter should ideally be 2-3 paragraphs. Use more if needed to capture the essential technical details from the original source. Feel free to use JavaScript code example code where appropriate. Any code, ascii tables, or ascii diagrams do not count against the number of paragraphs. 
- The audience for this content is technical. It is not for non-technical readers.
- Do your best not to lose any technical details described in the original content.
- It's really important to preserve technical details and facts from the original content. It is okey to violate the writing guidelines in order to preserve technical details and facts.
`


async function start() {
  try {
    const content = fs.readFileSync('ch4-transactions.md', 'utf8');
    // console.log(content)

    const prompt = headerPrompt + content + footerPrompt

    // Anthropic Claud
    const msg = await anthropic.messages.create({
      model: "claude-3-7-sonnet-20250219",
      max_tokens: 20000,
      temperature: 1,
      messages: [{
        role: "user",
        content: prompt,
      }]
    });
    // console.log(`Raw response from Claude: `, msg);

    const msgText = msg.content[0].text;
    console.log(`Raw response from Claude: `, msgText);

    const chapters = msgText.split('\n-----\n');
    
    // Write each chapter to its own file
    chapters.forEach((chapter, index) => {
      if (chapter.trim()) { // Only write non-empty chapters
        const filename = `md-out/${bookTitle}_${chapterTitle}_${index + 1}.md`;
        fs.writeFileSync(filename, chapter.trim());
        console.log(`Wrote ${filename}`);
      }
    });
    
  } catch(err) {
    console.error('Error in start(): ', err)
  }
}
start() 

