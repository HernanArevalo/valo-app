import { colors } from '@/app/theme';
import HomeButton from '@/components/HomeButton';
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
        <title>WEAPONS</title>
      </Head>

      <div className='weapons-page'>
        <h1 className='page-title'>WEAPONS</h1>

        <ul className='weapons-list'>
          { weapons.map(weapon => 
            <Link key={ weapon.displayName } href={`/weapons/${weapon.uuid}`} className='weapon-item-link' legacyBehavior>
              <li  className='weapon-item grow'>
                <div className='weapon-image'>
                  <img src={weapon.displayIcon} alt={`${weapon.displayName} image`}/>

                </div>
                <div className='weapon-info'>
                  <span className='weapon-name'>{weapon.displayName.toUpperCase()}</span>
                  <span className='weapon-type'>{weapon.shopData?.category.toUpperCase() || 'KNIFE'}</span>

                </div>

              </li>
            </Link>
          )}
        </ul>

      </div>
      <HomeButton />

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
          opacity: .8;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          height: 180px;
          border-radius: 30px;
          position: relative;
          cursor: pointer;
          transition: .3s;
          overflow: hidden;

        }
        .weapon-item:hover{
          opacity: 1;
        }
        .weapon-info{
          width: 100%; 
          height: 30%;  
          background-color: ${ colors.grey };
          color: ${ colors.white };
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 12px;
          padding-left: 20px;

        }
        .weapon-name{
          font-size: 30px;
          line-height: 25px;
          line-height: 30px;
          font-family: 'VALORANT', sans-serif;
        }
        .weapon-type{
          font-size: 12px;
          position: relative;
          bottom: 6px;
          font-family: 'g Game TC', sans-serif;
          font-weight: 100;
          color: ${ colors.blue };
          display: flex;            
          align-items: center;
        }
        .weapon-image{
          height: 70%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: end;
          padding: 0 20px;

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