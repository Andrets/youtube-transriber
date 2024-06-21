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
    return Response.json({ subs });
  } catch (error) {
    return Response.json({ error: error.message });
  }
}