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

  useEffect(() => {
    getData()
  }, [ ])
  

  return (
    <>
      <Head>
        <title>Agents</title>

      </Head>

      <div className='agents-page'>
        <h1>Agents</h1>

        <ul className='agents-list'>
          { agents.filter(agent => agent.isPlayableCharacter === true).map(agent => 

            <li key={ agent.displayName } className='agent-item grow'>

              <div className='agent-item-background'>
                { agent.role.displayName.toUpperCase() }
              </div>
              <div className='agent-item-left'>

                <span className='agent-item-name'>{agent.displayName.toUpperCase()}</span>

                <div className='agent-item-abilities'>
                  <Image src={agent.abilities[3]?.displayIcon} alt={`ability`} width={'25'} height={'25'}/>

                  <span>
                    {agent.abilities[3]?.displayName.toUpperCase() }
                  </span>

                </div>

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
          list-style: none;
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
          position: relative;

        }

        .agent-item-name{
          font-size: 30px;
          line-height: 30px;
          font-family: 'VALORANT', sans-serif;
                                                
        }
        .agent-item-left{
          padding-top: 60px;

        }
        .agent-item-right, .agent-item-left{
          z-index: 2;
        }

        .agent-item-right{
          height: 100%;
          display: flex;
          align-items: end;
          padding-bottom: 10px;
        }
        .agent-item-right img{

        }

        .agent-item-background {
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
            opacity: .1;
            z-index: 1;
            user-select: none;
            font-size: 80px;
            overflow: hidden;
        }
        .agent-item-abilities{
          color: ${ colors.red };
          font-weight: 100;
          display: flex;
          flex-direction: row;
          padding-top: 20px;
          gap: 8px;
        }
        .agent-item-abilities img{
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