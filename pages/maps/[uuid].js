/* eslint-disable react-hooks/exhaustive-deps */
import { colors } from '@/app/theme'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Map() {

  const router = useRouter()

  const [map, setMap] = useState( null )
  const [maps, setMaps] = useState( [] )



  async function getMapData() {
    const response = await fetch(`https://valorant-api.com/v1/maps/${ router.query.uuid }`);
    const jsonData = await response.json();
    setMap( jsonData.data )
  }
  
  async function getMaps() {
    const response2 = await fetch("https://valorant-api.com/v1/maps");
    const jsonData2 = await response2.json();
    setMaps( jsonData2.data )
  }

  useEffect(() => {
    if( router.isReady ) {
      getMapData()
      getMaps()
    }
   
  }, [ router.isReady ])

  useEffect(() => {
    if( router.isReady ) {
      getMapData()
    }

  }, [ router.query.uuid ])
  


  return (
    <>
      <Head>
        <title>Maps | { router.isReady? map?.displayName : '' }</title>
      </Head>

      <div className='map-layout'>
          <div className='maps-list'>
            <Link href="/maps" className='navbar-top-link' legacyBehavior>
            <a>
                <div className='navbar-top'>
                    <span className='back'>BACK</span>
                  <img className='valorant-logo' src='/logo-valorant.svg'/>
                </div>

            </a>

            </Link>
            <ul>
              { maps.filter(map => map.displayName.toUpperCase() != 'THE RANGE').map( map => 
                <li key={map.displayName}>
                  <Link href={`/maps/${map.uuid}`} legacyBehavior
                        className='map-link'
                  >
                    <a>{map.displayName.toUpperCase()}</a>
                  </Link>
                </li>
              )}

            </ul>
          </div>


          
          <div className='map-section'>
          { router.isReady &&
            <>
              <div className='map-info'>
                <div className='map-title'> { map?.displayName }</div>
                <div className='map-coords'> { map?.coordinates }</div>
              </div>

              <div className='map-right'>
                <div className='map-image'>
                  <img src={map?.displayIcon} alt={`${map?.displayName} image`} />
                </div>
              </div>

            </>
          }
          </div>
        
      </div>

      <style jsx>{`
        .map-layout{
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            font-family: 'Anton', sans-serif;
            background-image: url(/agents-background.jpg);
            background-size: cover;
            padding: 20px;
            gap: 20px;

        }

        .maps-list{
            background-color: rgba(17, 20, 26, .8);
            height: 100%;
            width: 330px;
            border-radius: 20px 5px 5px 20px;
            overflow-y: scroll;
            position: relative;
          }

        .map-section{
            background-color: rgba(17, 20, 26, 1);
            height: 70vh;
            width: 70vw;
            border-radius: 20px;
            overflow: hidden;
            position: relative;
            background-image: ${`url(${map?.splash})`};
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
            background-position: center;
            display: flex;
            flex-direction: row;
        }
        .map-info, .map-right{
          width: 50%;
          height: 100%;
          padding: 20px;
          
        }

        .map-info{
          display: flex;
          flex-direction: column;
          justify-content: end;
        }
        .map-title{
          font-family: 'VALORANT', sans-serif;
          font-size: 500%;
        }
        .map-coords{
          font-family: 'AuX DotBitC', sans-serif;
          font-size: 30px;
          word-spacing: 1%;
          top: -40px;
          padding: 0 10px;
          color: ${ colors.red };
          background-color: rgba(231, 231, 231, 0.6);
          
          width: fit-content;
          height: fit-content;
          position: relative;
        }
        .map-right{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50%;
        }
        .map-image{
          border-radius: 50%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .map-image img{
          width: 100%;
          background-color: #e7e7e7;
          padding: 40px;
          border-radius: 50%;

        }

        /* width */
        ::-webkit-scrollbar {
          width: 10px;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
          border-radius: 10px;
          transition: .3s;
          overflow: hidden;
          transition: background 1s;
        }

        .maps-list::-webkit-scrollbar-thumb {
          background: ${ colors.blue }; 
          transition: 2s;
          overflow: hidden
        }

        li{
          list-style: none;
          font-size: 50px;
          line-height: 60px;
          transition: color .3s;
          user-select: none;
        }

        a{
          text-decoration: none;
          color: #444;
          transition: .3s;
          width: 100%;
          cursor: pointer;
        }
        a:hover{
          color: ${ colors.red };
        }

        .valorant-logo{
          width: 40px;
          height: auto;
        }

        .navbar-top{
          background-color: ${ colors.white };
          display: flex;
          justify-content: center; 
          align-items: center;
          height: 60px;
          position: sticky;
          top: 0;
          display: flex;
          justify-content: space-between;
          padding: 20px 20px;

        }

        .back{
          color: ${ colors.black };
          font-size: 25px;
        }

        .navbar-top-link:hover .back {
          text-decoration: none;
        }

      `}</style>
    </>
  )
}