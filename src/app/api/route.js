'use server'
import { getSubtitles } from 'youtube-captions-scraper'


export async function GET(req, res) {
  const { searchParams } = new URL(req.url) 
  const videoID = searchParams.get('videoId')
  const lang = searchParams.get('lang')
  try {
    const subtitles = await getSubtitles({videoID: videoID, lang: lang}); // call this if you only need the subtitles
    console.log(subtitles);
    const subs = subtitles.map((caption) => ({
      text: caption.text,
      start: parseFloat(caption.start),
      end: parseFloat(caption.start) + parseFloat(caption.dur),
    }))

    const mergedSubs = await mergeSubtitles(subs)
    return Response.json({ mergedSubs });
  } catch (error) {
    return Response.json({ error: error.message });
  }
}

export async function mergeSubtitles(subs) {
  let sentences = []
  let currentSentence = ""
  let sentenceStart = subs[0].start
  let sentenceEnd = subs[0].end
  subs.forEach((sub, index) => {
    currentSentence += sub.text + " ";
    if (index === subs.length - 1 || (subs[index + 1].text[0] === subs[index + 1].text[0].toUpperCase() && !subs[index + 1].text.match(/^(\.|,|;|!|\?)$/))) {
      sentences.push({
        text: currentSentence.trim(),
        start: sentenceStart,
        end: sentenceEnd
      })
      currentSentence = ""
      if (index + 1 < subs.length) {
        sentenceStart = subs[index + 1].start
        sentenceEnd = subs[index + 1].end
      }
    }
  })

  return sentences
}