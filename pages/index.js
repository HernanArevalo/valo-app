import { colors } from '@/app/theme'
import Head from 'next/head'

export default function Home() {




  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <div>
        <h3>Home</h3>
      </div>

      <style jsx global>{`
        *{
          background-color: ${ colors.black };
        }
      `}</style>
    </>
  )
}