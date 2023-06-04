import { colors } from '@/app/theme'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {




  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <div className='home-page'>
        <h3 className='home-title'>VALORANT APP</h3>

        <div className='pages'>
          <Link href={`/agents`} >
            <div className='agents-page'>
            </div>
          </Link>
          <Link href={`/maps`} >
            <div className='maps-page'>
            </div>
          </Link>

        </div>

      </div>




      <style jsx global>{`
        body{
          width: 100vw;
          height: 100vh;
          background-image: url(/agents-background.jpg);
          background-attachment: fixed;
          background-size: cover;
          display: flex;
          justify-content: center;
        }
        *{
          padding: 0;
          margin: 0;
        }
        .home-title{
          font-family: 'VALORANT', sans-serif;
          font-size: 80px;
        }
        .pages{
          display: flex;
          flex-direction: row;
          gap: 30px;
        }
        .agents-page{
          background-image: url(/agents.jpg);
          background-size: 120%;
          background-position-x: center;
          width: 300px;
          height: 140px;
          border: 2px solid green;
        }
        .maps-page{
          background-image: url(/maps.jpg);
          background-size: 120%;
          background-position-x: center;
          width: 300px;
          height: 140px;
          border: 2px solid green;
        }
      `}</style>
    </>
  )
}