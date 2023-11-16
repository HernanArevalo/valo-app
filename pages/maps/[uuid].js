/* eslint-disable react-hooks/exhaustive-deps */
import { colors } from '@/app/theme'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const mapsInfo = {
  "lotus": "A mysterious structure housing an astral conduit radiates with ancient power. Great stone doors provide a variety of movement opportunities and unlock the paths to three mysterious sites.",
  "pearl": "Attackers push down into the Defenders on this two-site map set in a vibrant, underwater city. Pearl is a geo-driven map with no mechanics. Take the fight through a compact mid or the longer range wings in our first map set in Omega Earth.",
  "fracture": "A top secret research facility split apart by a failed radianite experiment. With defender options as divided as the map, the choice is yours: meet the attackers on their own turf or batten down the hatches to weather the assault.",
  "breeze": "Take in the sights of historic ruins or seaside caves on this tropical paradise. But bring some cover. You'll need them for the wide open spaces and long range engagements. Watch your flanks and this will be a Breeze.",
  "icebox": "Your next battleground is a secret Kingdom excavation site overtaken by the arctic. The two plant sites protected by snow and metal require some horizontal finesse. Take advantage of the ziplines and they’ll never see you coming.",
  "bind": "Two sites. No middle. Gotta pick left or right. What’s it going to be then? Both offer direct paths for attackers and a pair of one-way teleporters make it easier to flank.",
  "haven": "Beneath a forgotten monastery, a clamour emerges from rival Agents clashing to control three sites. There’s more territory to control, but defenders can use the extra real estate for aggressive pushes.",
  "split": "If you want to go far, you’ll have to go up. A pair of sites split by an elevated center allows for rapid movement using two rope ascenders. Each site is built with a looming tower vital for control. Remember to watch above before it all blows sky-high.",
  "ascent": "An open playground for small wars of position and attrition divide two sites on Ascent. Each site can be fortified by irreversible bomb doors; once they’re down, you’ll have to destroy them or find another way. Yield as little territory as possible.",
}



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
  

  console.log( mapsInfo["haven"] )


  return (
    <>
      <Head>
        <title>Maps | { router.isReady? map?.displayName : '' }</title>
      </Head>

      <div className='map-layout'>

          <div className='maps-list'>

            <Link href="/maps" className='navbar-top-link' legacyBehavior>
                <div className='navbar-top'>
                    <span className='back'>BACK</span>
                  <img className='valorant-logo' src='/logo-valorant.svg'/>
                </div>
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

                <div className='map-info-1'>
                  <div className='map-description'> 
                    { mapsInfo[ map?.displayName.toLowerCase() ] }
                  </div>
                </div>

                <div className='map-info-2'>
                  <div className='map-title'> 
                    { map?.displayName }
                  </div> 
                  <div className='map-coords'> 
                    { map?.coordinates }
                  </div>
                </div>
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
            align-items: end;
            box-shadow: 5px 5px 20px black;

        }
        .map-info, .map-right{
          width: 50%;
          padding: 20px;
        }
        .map-right{
          height: 100%;

        }
        .map-info{
          display: flex;
          flex-direction: column;
          justify-content: end;
          background-color: rgba(27, 30, 40, 0.85);
          height: fit-content;
          position: relative;
        }
        .map-info-1:before {
            content: '';
            position: absolute;
            top: 0; right: 0;
            border-top: 40px solid white;
            border-left: 40px solid transparent;
            width: 0;
        }

        .map-info-1{

          display: flex;
          align-items: center;
          justify-content: center;
          text-align: left;
        }

        .map-description{
          font-weight: 100;
          color: ${ colors.white };
          font-family: 'g Game TC', sans-serif;
                                                                                                
        }
        .map-title{
          font-family: 'VALORANT', sans-serif;
          font-size: 500%;
          color: ${ colors.blue };
        }
        .map-coords{
          font-family: 'AuX DotBitC', sans-serif;
          font-size: 30px;
          word-spacing: 1%;
          top: -40px;
          padding: 0 10px;
          color: ${ colors.black };
          background-color: ${ colors.white };
          
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
          width: 90%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .map-image img{
          width: 100%;
          background-color: rgba(231, 231, 231, 0.8);
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
          cursor: pointer;
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