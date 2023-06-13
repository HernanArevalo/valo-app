import { colors } from '@/app/theme';
import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Weapons() {

    const [weapons, setWeapons] = useState( [] )


    async function getData() {
      const response = await fetch("https://valorant-api.com/v1/weapons");
      const jsonData = await response.json();
  
      setWeapons(jsonData.data)

      
    }
  
    useEffect(() => {
      getData()
    }, [ ])



  return (
    <>
      <Head>
        <title>Weapons</title>
      </Head>

      <div className='weapons-page'>
        <h1 className='page-title'>AGENTS</h1>

        <ul className='weapons-list'>
          { weapons.map(weapon => 
            <Link key={ weapon.displayName } href={`/weapons/${weapon.uuid}`} className='weapon-item-link' legacyBehavior>
              <li  className='weapon-item grow'>
                <div className='weapon-image'>
                  <img src={weapon.displayIcon} alt={`${weapon.displayName} image`}/>

                </div>
                <span className='weapon-item-name'>{weapon.displayName.toUpperCase()}</span>
              </li>
            </Link>
          )}
        </ul>

      </div>

      <style jsx>{`
      .weapons-page{
        font-family: 'Anton', sans-serif;
        background-image: url(/agents-background.jpg);
        background-attachment: fixed;
        background-size: cover;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        flex-direction: column;
        min-height: 100vh;
      }
      .page-title{
        padding: 0;
        margin: 0;
        font-family: 'VALORANT';
        font-size: 100px;
        padding-top: 30px;
      }
      .weapons-list{
          display: grid;
          grid-template-columns: repeat(3,400px);
          justify-content: center;
          align-items: center;
          gap: 20px;
          list-style: none;
          margin: 0;
          padding: 20px;

        }

        .weapon-item{
          width: 100%;
          background-color: ${ colors.white };
          opacity: .7;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          height: 180px;
          border-radius: 30px;
          padding-left: 30px;
          position: relative;
          cursor: pointer;
          padding: 20px;
          transition: .3s;
        }
        .weapon-item:hover{
          opacity: 1;
        }

        .weapon-item-name{
          font-size: 30px;
          line-height: 30px;
          font-family: 'VALORANT', sans-serif;
          color: ${ colors.black };
          width: 100%;               
        }
        .weapon-image{
          height: 80%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: end;
          
        }
        .weapon-image img{
          height: 70%;
          object-fit: contain;
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