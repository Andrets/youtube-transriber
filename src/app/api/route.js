'use server'
import { usePathname } from 'next/navigation'
import { getSubtitles } from 'youtube-captions-scraper'

export async function generateStaticParams() {
  const dynamicRoutes = [{dynamic: '/api'}]
  return dynamicRoutes.map(route => ({
    dynamic: route.dynamic
  }))
}

export default async function DynamicPage({params}) {
  const router = usePathname()
  if (router === '/api') {
    return <div>Loading...</div>
  }
  return <div>Dynamic Page: {params.dynamic}</div>
}

export async function getStaticProps({params}) {
  return {
    props: {
      dynamic: params.dynamic
    }
  }
}

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