/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { colors } from '@/app/theme';
import HomeButton from '@/components/HomeButton';
import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
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
        <title>AGENTS</title>

      </Head>

      <div className='agents-page'>
      <h1 className='page-title'>AGENTS</h1>

        <ul className='agents-list'>
          { agents.filter(agent => agent.isPlayableCharacter === true).map(agent => 
            <Link key={ agent.displayName } href={`/agents/${agent.uuid}`} className='agent-item-link' legacyBehavior>
            <li  className='agent-item grow'>
                <div className={`agent-item-background ${agent.role.displayName.toLowerCase() }`}>
                  { agent.role.displayName.toUpperCase() }
                </div>
                <div className='agent-item-left'>

                  <span className='agent-item-name'>{agent.displayName.toUpperCase()}</span>

                  <div className='agent-item-abilities'>
                    <Image className='agent-item-ulti-image' src={agent.abilities[3]?.displayIcon} alt={`ability`} width={'25'} height={'25'}/>

                    <span>
                      {agent.abilities[3]?.displayName.toUpperCase() == 'ASTRAL FORM / COSMIC DIVIDE'?
                      'ASTRAL FORM':
                      agent.abilities[3]?.displayName.toUpperCase()
                      }
                    </span>

                  </div>

                </div>
                <div className='agent-item-right'>
                  <Image src={agent.fullPortrait} alt={`${agent.displayName} image`} width={'205'} height={'205'}/>

                </div>
              
            </li>
            </Link>


            )}
        </ul>
      </div>

      <HomeButton />

      <style jsx>{`

      .page-title{
        padding: 0;
        margin: 0;
        font-family: 'VALORANT';
        font-size: 100px;
        padding-top: 30px;

      }
      .agents-page{
        font-family: 'Anton', sans-serif;
        background-image: url(/agents-background.jpg);
        background-attachment: fixed;
        background-size: cover;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        flex-direction: column;
        overflow: hidden;

      }
      .agents-list{
        display: grid;
        grid-template-columns: repeat(3,400px);
        justify-content: center;
        align-items: center;
        gap: 20px;
        list-style: none;
        margin: 0;
        padding: 0px;
        width: calc(100vw - 15px);
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
        cursor: pointer;
      }

      .agent-item-left{
        position: relative;
        height: 100%;
        width: 50%;
      }
      .agent-item-name{
        font-size: 30px;
        line-height: 30px;
        font-family: 'VALORANT', sans-serif;
        color: #ffff;
        position: absolute;
        top: 46%;
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
      a{
        text-decoration: none;
      }

      .agent-item-background {
          color: grey;
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
          transition: .3s;
      }
      .agent-item:hover .agent-item-background{
        opacity: .5;
      }
      .agent-item:hover .agent-item-background.initiator{ 
        color: ${ colors.blue }; 
      }
      .agent-item:hover .agent-item-background.sentinel{ 
        color: ${ colors.green }; 
      }
      .agent-item:hover .agent-item-background.controller{ 
        color: ${ colors.yellow }; 
      }
      .agent-item:hover .agent-item-background.duelist{ 
        color: ${ colors.red }; 
      }
      .agent-item-abilities{
        color: ${ colors.red };
        font-weight: 100;
        display: flex;
        flex-direction: row;
        padding-top: 20px;
        gap: 8px;
        position: absolute;
        bottom: 20px;

      }

      .agent-item-abilities span{
        word-wrap: ;
        width: 100%;
        font-size: 18px;
        line-height: 17px;

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
      @media screen and (max-width: 1300px){
        .agents-list{
          grid-template-columns: repeat(2,400px);
        }
      }
      @media screen and (max-width: 900px){
        .agents-list{
          grid-template-columns: repeat(2,350px);
        }
      }
      @media screen and (max-width: 800px){
        .agents-list{
          grid-template-columns: repeat(1,400px);
        }
      }
      @media screen and (max-width: 500px){
        .agents-list{
          display: flex;
          flex-direction: column;
          width: 100vw;
          gap: 40px;

        }
        .agent-item{
          max-width: 90%;
          width: 400px;
        }
        .agent-item{
          height: 160px;
        }
        .page-title{
          font-size: 70px;
        }

      }
      `}</style>
    </>
  )
}