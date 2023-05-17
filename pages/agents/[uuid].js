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

            <img className='valorant-logo' src='/logo-valorant.svg'/>
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
                <div className='agent-top'>
                  <div className='agent-image-bg'>
                    <img src={agent?.background} alt={`agent image`} className='agent-name'/>
                  </div>
                  <div className='agent-abilities'>

                  </div>
                </div>


                <div className='agent-info'>
                    <div className='agent-info-left'>
                      <img className='agent-image' src={agent?.fullPortrait} alt={`agent image`}/>
                      <h3>{agent?.displayName}</h3>
                    </div>
                    <div className='agent-info-rigth'>

                    </div>

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
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow: hidden;
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
          text-decoration: none;
          color: ${ colors.blue };
        }

        .agent-name{
          font-size: 80px;
          width: 400px;
          height: auto;
          opacity: .8;
        }
        .agent-info{
          width: 100%;
          height: 40%;
          position: relative;
          background-color: white;
          border-radius: 0px 0px 20px 20px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .agent-image{
          position: absolute;
          top: -450px;
          width: 600px;
        }

        .agent-info h3{
          color: ${ colors.black };
          font-family: 'VALORANT', sans-serif;
          font-size: 60px;
        }

        .agent-info-left{
          width: 50%;
          height: 100%;
          display: flex;
          align-items: end;
          justify-content: center;

        }

        .agent-top{
          display: flex;
          flex-direction: row;
          width: 100%;
        }

        .agent-top > div{
          width: 50%;

        }
        .agent-image-bg{
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .agent-image-bg{
          transform: scale(1.2);
        }


        .valorant-logo{
          width: 40px;
          height: auto;
        }
      `}</style>
    </>
  )
}