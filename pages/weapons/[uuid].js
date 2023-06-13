import { colors } from '@/app/theme'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const weaponsInfo = {
  "odin": "Wielding this hammer of a machine threatens glory for the holder and ruin for the foe.",
  "ares": "Don't mistake it's size for clunk.",
  "vandal": "This accurate powerhouse is ferocious in small bursts.",
  "bulldog": "This accurate powerhouse is ferocious in small bursts.",
  "phantom": "A balanced weapon built for stable, extended shots.",
  "judge": "Automatic, rapid fire shotgun that provides sustained high damage.",
  "bucky": "Attacker. Defender. You're the one with the pump-action shotgun.",
  "frenzy": "Up close, hold the trigger. From afar...try something else.",
  "classic": "Lightweight and versatile, the default weapon for all is an instant classic.",
  "ghost": "Sleek, silenced, and proficient at any range.",
  "sheriff": "A modern six-shooter for the headshot searcher.",
  "shorty": "Surprise your enemy up close for max effectiveness.",
  "operator": "Get cozy and you can control important ground.",
  "guardian": "Shines in the hands of a patient shooter.",
  "marshal": "Hold an angle, breathe, and they'll regret turning that corner.",
  "spectre": "When in doubt, the Spectre is your number one.",
  "stinger": "They'll know it's over when the Stinger splash hits.",
  "melee": "An intimate solution.",
}



export default function Map() {

  const router = useRouter()

  const [weapon, setWeapon] = useState( null )
  const [weapons, setWeapons] = useState( [] )



  async function getWeaponData() {
    const response = await fetch(`https://valorant-api.com/v1/weapons/${ router.query.uuid }`);
    const jsonData = await response.json();
    setWeapon( jsonData.data )
  }
  
  async function getWeapons() {
    const response2 = await fetch("https://valorant-api.com/v1/weapons");
    const jsonData2 = await response2.json();
    setWeapons( jsonData2.data )
  }

  useEffect(() => {
    if( router.isReady ) {
      getWeaponData()
      getWeapons()
    }
   
  }, [ router.isReady ])

  useEffect(() => {
    if( router.isReady ) {
      getWeaponData()
    }

  }, [ router.query.uuid ])
  


  return (
    <>
      <Head>
        <title>Weapons | { router.isReady? weapon?.displayName : '' }</title>
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
            background-image: ${`url(${weapon?.splash})`};
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
            background-position: center;
            display: flex;
            flex-direction: row;
            align-items: end;
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