import Head from "next/head";
import Navbar from "./static/navbar";
//import { Html, Head, Main, NextScript } from 'next/document'



export default function Home() {
  return (
    <div style={{height: "100vh"}}>
      <Head></Head>
      <main className="h-100 d-flex flex-column" style={{background: "#f5f5f5"}} >
        <Navbar />
        <div className="m-auto border col-8 py-5 rounded bg-neutral-color">
          <h1 className="logoText text-center mt-0" style={{ fontSize: "4rem" }}>
            Marlayer
          </h1>
          <h1 className="text-center " style={{ fontSize: "3rem" }}>WEB SERVICES</h1>

          <h4 className="text-center mt-5">Coming Soon ...</h4>
        </div>
            
        
        {/* <h1 className="themeFont">
          Welcome to{" "}
          <a href="https://nextjs.org" className="text-success">
            Next.js!
          </a>
        </h1>

        <p className={styles.description}>
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3 className="fw-bold">Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}
      </main>
    </div>
  );
}
