import Head from 'next/head'
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


    for (const weapon of weapons) {
        console.log(weapon.displayName)
    }
    
  return (
    <>
      <Head>
        <title>Weapons</title>
      </Head>

      <div>
        <h1>Weapons</h1>
      </div>

      <style jsx>{`

      `}</style>
    </>
  )
}