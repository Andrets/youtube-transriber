'use client'
import { CaptionTable } from '@/components/Table'
import { useEffect, useState } from 'react'
import styles from "./page.module.css"

export default function Home() {
  const [videoId, setVideoId] = useState('')
  const [captions, setCaptions] = useState([])
  const [videoUrl, setVideoUrl] = useState('')
  const [lang, setLang] = useState('en')
  const [isFetching, setIsFetching] = useState(false)
  
  useEffect(() => {
    setVideoId(videoUrl.split('v=')[1])
  }, [videoUrl])
  const loadCaptions = async () => {
    setIsFetching(true)
    try {
      console.log(videoId)
      const response = await fetch(`/api?videoId=${videoId}&lang=${lang}`)
      const data = await response.json()
      setCaptions(data.mergedSubs)
    } catch (error) {
      console.error(error)
    } finally {
      setIsFetching(false)
    }
  }

  const processCaptions = (captions) => {
    const sentenceRegex = /[^.!?]+[.!?]+/g // Регулярное выражение для предложений
    let processed = []

    captions.forEach(caption => {
      const matches = caption.text.match(sentenceRegex)
      if (matches) {
        matches.forEach(sentence => {
          processed.push({
            text: sentence.trim(),
            start: caption.start,
            end: caption.end
          })
        })
      } else {
        processed.push(caption)
      }
    })

    return processed
  }


  return (
    <main className={styles.main}>
        <div className={styles.container}>
        <h1>YouTube Video Subtitles Parser</h1>
        <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
        <br />
        <button onClick={loadCaptions} disabled={isFetching}>
          {isFetching ? 'Loading...' : 'Load Captions'}
        </button>
        {captions.length > 0 && <CaptionTable captions={captions} className={styles.table} />}
      </div>
    </main>
  );
}
