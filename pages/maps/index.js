/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { colors } from '@/app/theme';
import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useState } from 'react';

export default function Maps() {

  const [maps, setmaps] = useState( [] )


  async function getData() {
    const response = await fetch("https://valorant-api.com/v1/maps");
    const jsonData = await response.json();

    setmaps(jsonData.data)
    console.log(jsonData.data)
  }

  useEffect(() => {
    getData()
  }, [ ])
  
  console.log(maps)

  return (
    <>
      <Head>
        <title>Maps</title>

      </Head>

      <div className='maps-page'>
        <h1 className='page-title'>MAPS</h1>

        <ul className='maps-list'>
          { maps.map(map => 
            <Link key={ map.displayName } href={`/maps/${map.uuid}`} className='map-item-link' legacyBehavior>
            <a>
            <li  className='map-item grow' >

              <div className='map-item-left'>
                <span className='map-item-name'>{map.displayName.toUpperCase()}</span>
              </div>

              <div className='map-item-background'>
                <img src={map.splash} alt={`${map.displayName} image`} />
              </div>


              
            </li>
            </a>
            </Link>


            )}
        </ul>
      </div>

      <style jsx>{`
        .page-title{
          padding: 0;
          margin: 0;
          font-family: 'VALORANT';
          font-size: 100px;

        }
        .maps-page{
          font-family: 'Anton', sans-serif;
          background-image: url(/agents-background.jpg);
          background-attachment: fixed;
          background-size: cover;
          margin: 0;
          padding: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .maps-list{
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: end;
          gap: 20px;
          list-style: none;
          margin: 0;
          padding: 20px;

        }
        .map-item{
          background-color: ${ colors.grey };
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 180px;
          width: 320px;
          border-radius: 30px;
          padding-left: 30px;
          position: relative;
          text-decoration: none;
          background-attachment: fixed;
          background-size: cover;
          overflow: hidden;

        }


        .map-item-name{
          font-size: 30px;
          line-height: 30px;
          font-family: 'VALORANT', sans-serif;
          color: #ffff;
                                                
        }
        .map-item-left{
          padding-top: 60px;

        }
        .map-item-right, .map-item-left{
          z-index: 2;
        }

        .map-item-right{
          height: 100%;
          display: flex;
          align-items: end;
          padding-bottom: 10px;
        }
        .map-item-right img{

        }
        a{
          text-decoration: none;
        }
        a:hover{
          text-decoration: none;
        }
        .map-item-link:hover .map-item-name{
          text-decoration: none;
        }
        .map-item-background {
            color: grey;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: ;
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: .8;
            z-index: 1;
            user-select: none;
            font-size: 80px;
            overflow: hidden;
        }
        .map-item-abilities{
          color: ${ colors.red };
          font-weight: 100;
          display: flex;
          flex-direction: row;
          padding-top: 20px;
          gap: 8px;
        }
        .map-item-abilities img{
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


      `}</style>
    </>
  )
}