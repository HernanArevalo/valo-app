/* eslint-disable react-hooks/exhaustive-deps */
import { colors } from '@/app/theme'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Agent() {

  const router = useRouter()

  const [agent, setAgent] = useState( null )
  const [agents, setAgents] = useState( [] )



  async function getAgentData() {
    const response = await fetch(`https://valorant-api.com/v1/agents/${ router.query.uuid }`);
    const jsonData = await response.json();

    setAgent(jsonData.data)
    
  }
  
  async function getAgents() {


    const response2 = await fetch("https://valorant-api.com/v1/agents");
    const jsonData2 = await response2.json();

    setAgents(jsonData2.data)
    
  }

  useEffect(() => {
    if( router.isReady ) {
      getAgentData()
      getAgents()
    }
   
  }, [ router.isReady ])

  useEffect(() => {
    if( router.isReady ) {
    getAgentData()
    }

  }, [ router.query.uuid ])
  



  return (
    <>
      <Head>
        <title>Agents | { router.isReady? agent?.displayName : '' }</title>
      </Head>

      <div className='agent-layout'>

          <div className='agents-list'>
            <ul>
              { agents.filter(agent => agent.isPlayableCharacter === true).map( agentList => 
                <li key={agentList.displayName}>
                  <Link href={`/agents/${agentList.uuid}`} legacyBehavior
                        className='agent-link'
                  >
                    <a>{agentList.displayName.toUpperCase()}</a>
                  </Link>
                </li>
              )}

            </ul>
          </div>

          
          <div className='agent-section'>
          { router.isReady &&
            <>
                <span className='agent-name'>{ agent?.displayName.toUpperCase() }</span>

                <div className='agent-item-right'>
                    <Image src={agent?.fullPortrait} alt={`agent image`} width={'205'} height={'205'}/>

                </div>
            </>


          }
          </div>
          <h1>Asd</h1>
        
      </div>

      <style jsx>{`
        .agent-layout{
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Anton', sans-serif;
            background-image: url(/agents-background.jpg);
            background-size: cover;
            gap: 40px;

        }

        .agent-section{
            background-color: rgba(17, 20, 26, .8);
            height: 90%;
            width: 1200px;
            border-radius: 20px;
        }
        .agents-list{
            background-color: rgba(17, 20, 26, .8);
            height: 90%;
            width: 330px;
            border-radius: 20px 5px 5px 20px;
            overflow-y: scroll;
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


        .agents-list::-webkit-scrollbar-thumb {
          background: #444; 
          transition: 2s;
          overflow: hidden
        }


        li{
          list-style: none;
          font-size: 50px;
          line-height: 60px;
          cursor: pointer;
          transition: color .3s;
          user-select: none;
        }


        a{
          text-decoration: none;
          color: #444;
          transition: .3s;
        }
        li:hover > a{
          text-decoration: none;
          color: ${ colors.blue };
        }

        .agent-name{
          
        }
      `}</style>
    </>
  )
}