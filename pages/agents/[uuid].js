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
  

  const [activeAbility, setActiveAbility] = useState(0)


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

              <div className='agent-image-bg'>
                <img src={agent?.background} className='agent-image-bg-img' alt={``}/>
              </div>

              <div className='agent-abilities'>
                
                <div className='agent-abilities-titlte'>
                  <span>ABILITIES</span>
                </div>

                <div className='abilities-container'>
                  { agent?.abilities.slice(0,3).map((ability, idx) => 
                  
                    <div className={`agent-ability ability${idx} ${idx == activeAbility? 'active-ability' : ''}`} 
                         key={`agent-ability-${idx}`}
                         onClick={() => { setActiveAbility(idx)}}
                         >

                      <div className={`agent-ability-logo ${idx}`}>
                        <img src={ability.displayIcon} alt={``}/>
                      </div>

                      <div className={`agent-ability-name ${idx}`}>
                        { ability.displayName }
                      </div>
                    </div>
                  )}
                </div>

                { agent?.abilities &&
                <div className='agent-ability-desc'>
                    { agent.abilities[activeAbility].description }
                </div>}
                  
              </div>

              <div className='agent-info-left'>
                <img className='agent-image' src={agent?.fullPortrait} alt={``}/>
                <h3 className='agent-name'>{agent?.displayName}</h3>
                <h4 className='agent-role'>{agent?.role.displayName.toUpperCase()}</h4>
              </div>

              <div className='agent-bio'>
                <span>BIOGRAPHY</span>
                <p>{ agent?.description }</p>
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
            justify-content: space-evenly;
            font-family: 'Anton', sans-serif;
            background-image: url(/agents-background.jpg);
            background-size: cover;
            padding: 20px;
            gap: 20px;

        }

        .agent-section{
            background-color: rgba(17, 20, 26, .8);
            height: 100%;
            width: 1200px;
            border-radius: 20px;
            overflow: hidden;
            display: grid;
            grid-template-columns: repeat(2, 50%);
            grid-template-rows: 65% 35%;
            position: relative;
        }
        .agents-list{
            background-color: rgba(17, 20, 26, .8);
            height: 100%;
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

      
        .agent-image-bg{
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          transform: scale(1.2);
          grid-column: 1;
          grid-row: 1;
        }
        .agent-image-bg-img{
          font-size: 80px;
          width: 400px;
          height: auto;
        }

        .agent-abilities{
          gap: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px;
        }

        .agent-abilities-titlte{
          font-size: 60px;
          line-height: 80px;
          font-family: 'VALORANT';
          background-color: ${ colors.white };
          color: ${ colors.black };
          padding-top: 10px;
          padding-left: 20px;
          padding-right: 20px;
        }
        .agent-ability{
          display: flex;
          flex-direction: column;
          justify-content: start;
          align-items: center;
          width: 100px;
          height: fit-content;
          gap: 10px;
          transition: .3s;
          cursor: pointer;
          padding-top: 5px;
        }
        .agent-ability:hover{
          background-color: rgba(231, 50, 71, 0.7);
        }

        .active-ability{
          background-color: rgba(231, 50, 71, 0.7);
        }
        .agent-ability-logo{
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .agent-ability-logo img{
          width: 65%;
        }
        .agent-ability-name{
          font-family: 'VALORANT', sans-serif;
          font-size: 14px;
          cursor: pointer;
          text-align: center;
          
        }


        .agent-ability-desc{
          font-size: 20px;
          text-align: center;
          background-color: rgba(231, 50, 71, 0.3);
          padding: 15px;
          font-weight: 100;
          letter-spacing: 1px;

        }

        .abilities-container{
          display: flex;
          flex-direction: row;
          gap: 20px;
        }


        .agent-info{
          position: relative;
          background-color: white;
          border-radius: 0px 0px 20px 20px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          grid-column: 1;
          grid-row: 2;
        }
        .agent-image{
          height: 200%;
          position: absolute;
          bottom: 70%;
        }

        .agent-info-left{
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          grid-column: 1;
          grid-row: 2;
          background-color: ${ colors.white };
        }

        .agent-bio{
          background-color: ${ colors.white };
          color: ${ colors.black };
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px 40px;
          font-size: 20px;
          letter-spacing: 1px;
          font-weight: 300;

        }
        .agent-bio span{
          color: grey;
          font-family: 'VALORANT', sans-serif;
          font-size: 30px;
        }
        .agent-bio p{
          margin: 0;
        }
        .agent-top{
          display: flex;
          flex-direction: row;
          width: 100%;
        }

        .agent-top > div{
          width: 50%;
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
        .agent-abilities{
          grid-column: 2;
          grid-row: 1;

        }
        .agent-bio{
          grid-column: 2;
          grid-row: 2;

        }
      `}</style>
    </>
  )
}