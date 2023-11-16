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

      <div className='weapon-layout'>
          <div className='weapons-list'>
            <Link href="/weapons" className='navbar-top-link' legacyBehavior>
                <div className='navbar-top'>
                    <span className='back'>BACK</span>
                  <img className='valorant-logo' src='/logo-valorant.svg'/>
                </div>


            </Link>
            <ul>
              { weapons.map( weaponList => 
                <li key={weapon?.displayName}>
                  <Link href={`/weapons/${weaponList.uuid}`} legacyBehavior
                        className='weapon-link'
                  >
                    <a>{weaponList.displayName.toUpperCase()}</a>
                  </Link>
                </li>
              )}

            </ul>
          </div>


          
          <div className='weapon-section'>
          { router.isReady &&
            <>

                  <div className='weapon-description'>
                    <td>“</td>
                    { `${weaponsInfo[ weapon?.displayName.toLowerCase() ]}` }
                    <td>“</td>
                  </div>

                  <div className='weapon-title'>
                    { weapon?.displayName }
                  </div>

                  <div className='weapon-image'>
                    <img src={weapon?.displayIcon} alt={`${weapon?.displayName} image`} />
                  </div>


            </>
          }
          </div>
        
      </div>

      <style jsx>{`
        .weapon-layout{
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

        .weapons-list{
            background-color: rgba(17, 20, 26, .8);
            height: 100%;
            width: 330px;
            border-radius: 20px 5px 5px 20px;
            overflow-y: scroll;
            position: relative;
          }

        .weapon-section{
            background-color: rgba(255, 255, 255, 0.8);
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

        .weapon-title{
          font-family: 'VALORANT', sans-serif;
          font-size: 500%;
          color: ${ colors.blue };
        }
        .weapon-description{
          font-family: 'Times New Roman';
          color: ${ colors.red };
          font-size: 20px;
        }


        .weapon-image{
          border-radius: 50%;
          width: 90%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .weapon-image img{
          width: 70%;

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

        .weapons-list::-webkit-scrollbar-thumb {
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