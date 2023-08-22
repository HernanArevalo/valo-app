import { colors } from "@/app/theme";
import Link from "next/link";

export default function HomeButton() {


  return (
    <>

    <Link href="/" className='home-button-link'>
        <div className="home-button">
            <img className='home-button-logo' src='/logo-valorant.svg'/>
            <span className="home-button-text">HOME</span>
        </div>
    </Link>

      <style jsx>{`
        .home-button{
            position: absolute;
            top: 20px;
            left: 20px;
            background-color: #6666;
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            gap: 5px;
            justify-content: center;
            align-items: center;
            transition: .3s;
            padding: 10px;
        }
        .home-button-link{
            width: 100%;
            height: 100%;
        }
        .home-button-text{
            font-family: 'Anton', sans-serif;
            color: black;
            line-height: 20px;
        }
        .home-button-logo{
            width: auto;
        }
        .home-button:hover{
            background-color: rgba(255, 255, 255, 0.3);

        }

      `}</style>
    </>
  )
}