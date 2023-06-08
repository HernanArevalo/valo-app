import { colors } from '@/app/theme'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {




  return (
    <>
      <Head>
        <title>Valo Wiki | Home</title>
      </Head>

      <div className='home-page'>
        <h3 className='home-title'>VALO WIKI </h3>

        <div className='pages'>
          <Link href={`/agents`} className='page grow'>
            <div className='agents-page'>
              <div className='page-title'>AGENTS</div>
            </div>
          </Link>
          <Link href={`/maps`} className='page grow'>
            <div className='maps-page'>
              <div className='page-title'>MAPS</div>
            </div>
          </Link>

        </div>

      </div>




      <style jsx global>{`
        *{
          padding: 0;
          margin: 0;
        }
        body{
          width: 100vw;
          height: 100vh;
          background-image: url(/agents-background.jpg);
          background-color: aqua;
          background-attachment: fixed;
          background-size: cover;
        }
        .home-page{
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;

          
        }
        .home-title{
          font-family: 'VALORANT', sans-serif;
          font-size: 80px;
          margin-bottom: 80px;
          margin-top: 20px;
        }
        .pages{
          width: 1000px;
          max-width: 90%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 30px;
        }
        .page{
          width: 100%;
        }
        .grow{
          transition: .5s, color .10s;
          -webkit-transition: .5s, color .10s;
          -moz-transition: .5s, color .10s;
        }
        .grow:hover{
          transform: scale3d(1.5, 1.5, 0.3);
          -webkit-transform: scale3d(1.08, 1.08, 0.3);
          -moz-transform: scale3d(1.08, 1.08, 0.3);
          z-index: 999;
        }
        .agents-page{
          background-image: url(/agents.jpg);
          background-size: 120%;
          background-position-x: center;
          width: 100%;
          height: 140px;
        }
        .maps-page{
          background-image: url(/maps.jpg);
          background-size: 120%;
          background-position-x: center;
          background-position-y: center;
          width: 100%;
          height: 140px;
        }
        .page-title{
          color: white;
          font-size: 40px;
          font-family: 'VALORANT', sans-serif;
          height: 100%;
          display: flex;
          align-items: end;
          padding-left: 20px;
          background: rgb(0,0,0);
          background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%);
        }
      `}</style>
    </>
  )
}