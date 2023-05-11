import { colors } from '@/app/theme';
import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return (
    <>
        <Component {...pageProps} />
    <style jsx>{`
        *{
            background-color: #0070f3;
        }
    `}</style>
    </>
    );
}