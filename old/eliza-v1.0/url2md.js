/*
  This is a prototype for retrieving the HTML associated with a URL, then
  feeding the HTML into Turndown to convert it to Markdown.
*/

import axios from 'axios'
import TurndownService from 'turndown'

const turndownService = new TurndownService()

async function start() {
  try {
    const url = 'http://zh.thedev.id/mastering-bitcoin-cash/4-transactions.html'
    const response = await axios.get(url)
    const html = response.data
    // console.log(html)

    const markdown = turndownService.turndown(html)
    console.log(markdown)
  } catch(err) {
    console.error('Error in start(): ', err)
  }
}
start()