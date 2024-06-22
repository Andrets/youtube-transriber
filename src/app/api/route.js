'use server'
import { getSubtitles } from 'youtube-captions-scraper'


export async function GET(req, res) {
  const { searchParams } = new URL(req.url) 
  const videoID = searchParams.get('videoId')
  const lang = searchParams.get('lang')
  try {
    const subtitles = await getSubtitles({videoID: videoID, lang: lang}); // call this if you only need the subtitles
    const mergedSubs = await mergeSubtitles(subtitles)
    return Response.json({ mergedSubs });
  } catch (error) {
    return Response.json({ error: error.message });
  }
}

export async function mergeSubtitles(subs) {
  const formatDate = (time) => {
    const date = new Date(time * 1000)
    const mSecs = (time % 1).toFixed(3).split('.')[1]
    return `${date.toISOString().split('T')[1].split('.')[0]}.${mSecs}`
  }
  let sentences = []
  let currentSentence = ""
  let sentenceStart = parseFloat(subs[0].start)
  let sentenceEnd = parseFloat(subs[0].start) + parseFloat(subs[0].dur)
  subs.forEach((sub, index) => {
    if (currentSentence.length > 0) {
      currentSentence += " "
    }
    currentSentence += sub.text
    sentenceEnd = parseFloat(sub.start) + parseFloat(sub.dur)

    const nextSub = subs[index + 1]
    const endsWithPunctuation = sub.text.endsWith('.') || sub.text.endsWith('!') || sub.text.endsWith('?');
    const startsWithUpperCase = nextSub && nextSub.text[0] === nextSub.text[0].toUpperCase();
    const isNewSentence = index === subs.length - 1 || (endsWithPunctuation && startsWithUpperCase)

    if (isNewSentence) {
      sentences.push({
        text: currentSentence.trim(),
        start: formatDate(sentenceStart),
        end: formatDate(sentenceEnd)
      });

      currentSentence = "";
      if (index + 1 < subs.length) {
        sentenceStart = parseFloat(subs[index + 1].start);
      }
    }
  })

  return sentences
}