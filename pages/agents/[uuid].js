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
            <Link href="/agents" className='navbar-top-link' legacyBehavior>
            <a>
                <div className='navbar-top'>
                    <span className='back'>BACK</span>
                  <img className='valorant-logo' src='/logo-valorant.svg'/>
                </div>

            </a>

            </Link>
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
                    <img src={agent?.background} className='agent-name-bg' alt={``}/>
                  </div>
                  <div className='agent-abilities'>

                  </div>
                </div>


                <div className='agent-info'>
                    <div className='agent-info-left'>
                      <img className='agent-image' src={agent?.fullPortrait} alt={``}/>
                      <h3 className='agent-name'>{agent?.displayName}</h3>
                      <h4 className='agent-role'>{agent?.role.displayName.toUpperCase()}</h4>
                    </div>
                    <div className='agent-info-rigth'>

                    </div>

                </div>
            </>


          }
          </div>
        
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
            position: relative;
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
          color: ${ colors.blue };
        }

        .agent-name-bg{
          font-size: 80px;
          width: 400px;
          height: auto;
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

        .agent-info-left{
          width: 50%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
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
        .agent-name{
          margin: 0;
          color: ${ colors.black };
          font-family: 'VALORANT', sans-serif;
          font-size: 70px;
          line-height: 60px;
          margin-top: 40px;
        }
        
        .agent-role{
          color: grey;
          font-family: 'Anton', sans-serif;
          margin: 0;
          font-size: 30px;
          letter-spacing: 5px;
          
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