/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { colors } from '@/app/theme';
import Head from 'next/head'
import Image from 'next/image';
import { useEffect, useLayoutEffect, useState } from 'react';

export default function Agents() {

  const [agents, setAgents] = useState( [] )


  async function getData() {
    const response = await fetch("https://valorant-api.com/v1/agents");
    const jsonData = await response.json();

    setAgents(jsonData.data)
    
  }


  useLayoutEffect(() => {
    getData()
    console.log(agents)
  }, [ ])
  
  getData()



  return (
    <>
      <Head>
        <title>Agents</title>

      </Head>

      <div className='agents-page'>
        <h1>Agents</h1>

        <ul className='agents-list'>
          { agents.filter(agent => agent.isPlayableCharacter === true).map(agent => 

            <li key={ agent.displayName } className='agent-item'>

              <div className='agent-item-left'>
                <span className='agent-item-name'>{agent.displayName.toUpperCase()}</span>

              </div>
              <div className='agent-item-right'>
                <Image src={agent.fullPortrait} alt={`${agent.displayName} image`} width={'205'} height={'205'}/>

              </div>
              
            </li>


            )}
        </ul>
      </div>

      <style jsx>{`
        .agents-page{
          font-family: 'Anton', sans-serif;
        }
        .agents-list{
          display: grid;
          grid-template-columns: repeat(3,400px);
          justify-content: center;
          align-items: center;
          gap: 20px;
          list-style: none

          ;

        }
        .agent-item{
          background-color: ${ colors.grey };
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 180px;
          border-radius: 30px;
          padding-left: 30px;

        }

        .agent-item-name{
          font-size: 30px;
          font-family: 'VALORANT', sans-serif;
                                                
        }

        .agent-item-right{
          height: 100%;
          display: flex;
          align-items: end;
          padding-bottom: 10px;
        }
        .agent-item-right img{

        }

      `}</style>
    </>
  )
}