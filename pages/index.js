import Head from 'next/head';
import Link from 'next/link';
import 'animate.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Valo Wiki | Home</title>
      </Head>

      <div className="home-page animate__animated animate__fadeIn">
        <h3 className="home-title">VALO WIKI </h3>

        <div className="pages animate__animated animate__fadeIn animate__delay-.5s">
          <Link href={`/agents`} className="page grow">
            <div className="agents-page">
              <div className="page-title">AGENTS</div>
            </div>
          </Link>
          <Link href={`/maps`} className="page grow">
            <div className="maps-page">
              <div className="page-title">MAPS</div>
            </div>
          </Link>
          <Link href={`/weapons`} className="page grow">
            <div className="weapons-page">
              <div className="page-title">WEAPONS</div>
            </div>
          </Link>
        </div>
      </div>

      <style jsx global>{`
        * {
          padding: 0;
          margin: 0;
        }
        body {
          width: 100vw;
          height: 100vh;
          background-image: url(/agents-background.jpg);
          background-attachment: fixed;
          background-size: cover;
        }
        .home-page {
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .home-title {
          font-family: 'VALORANT', sans-serif;
          font-size: 80px;
          margin-bottom: 80px;
          margin-top: 20px;
        }
        .pages {
          width: 900px;
          max-width: 80%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 30px;
        }
        .page {
          width: 100%;
        }
        .grow {
          transition: 0.5s, color 0.1s;
          -webkit-transition: 0.5s, color 0.1s;
          -moz-transition: 0.5s, color 0.1s;
        }
        .grow:hover {
          transform: scale3d(1.2, 1.2, 0.3);
          -webkit-transform: scale3d(1.2, 1.2, 0.3);
          -moz-transform: scale3d(1.2, 1.2, 0.3);
          z-index: 999;
        }
        .agents-page,
        .maps-page,
        .weapons-page {
          background-size: 120%;
          background-position-x: center;
          width: 100%;
          height: 140px;
        }
        .agents-page {
          background-image: url(/agents.jpg);
        }
        .maps-page {
          background-image: url(/maps.jpg);
        }
        .weapons-page {
          background-image: url(/weapons.jpg);
        }
        .page-title {
          backdrop-filter: grayscale(90%);
          color: white;
          font-size: 60px;
          line-height: 50px;
          font-family: 'VALORANT', sans-serif;
          height: 100%;
          display: flex;
          align-items: end;
          padding-left: 20px;
          background: rgb(0, 0, 0);
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0) 60%
          );
          transition: 0.3s;
        }
        .page-title:hover {
          backdrop-filter: grayscale(0%);
        }
        a {
          text-decoration: none;
        }
        a:hover {
          text-decoration: none;
        }
        @media screen and (max-height: 800px) {
          .home-title {
            font-size: 80px;
            margin-bottom: 40px;
          }
        }
        @media screen and (max-height: 800px) {
          .home-title {
            margin-bottom: 0px;
          }
        }
        @media screen and (max-width: 500px) {
          .home-title {
            font-size: 60px;
          }
          .pages {
            max-width: 80%;
            border-radius: 10px;
          }
          .grow:hover {
            transform: scale3d(1.1, 1.1, 0.3);
            -webkit-transform: scale3d(1.1, 1.1, 0.3);
            -moz-transform: scale3d(1.1, 1.1, 0.3);
            z-index: 999;
          }
        }
        @media screen and (max-width: 460px) {
          .page-title {
            font-size: 45px;
          }
        }
      `}</style>
    </>
  );
}
