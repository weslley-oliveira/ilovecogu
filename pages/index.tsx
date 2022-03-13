import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>I Love Cogu 🍄</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="px-4 md:px-20 h-screen text-gray-100 flex align-middle items-center bg-[url('/bg.jpg')] bg-cover">
        <section className='flex flex-row'>
          <div className='p-10 md:w-1/2 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 rounded-md'>
            <h1 className=" text-4xl md:text-6xl pb-6 font-bold">
              I Love Cogu
              <a className="text-blue-600" href="https://www.instagram.com/ilovecogu/">
              {" "} 🍄
              </a>
            </h1>
            <p className='md:text-xl font-light opacity-75'>
              Its time to explore the world of magic and beautiful mushrooms. Something you have never seen or perhaps 
              heard in the movies. Because We love mushrooms and because We want to share this with you, we are taking 
              you with us on a journey through underground worlds, fairy like fields and mushroom forests. 
              We want to inspire you to feel this wonder and beauty together with us.
            </p>
          </div>
          <div>
            
          </div>
        </section>
      </main>
      <div className="p-4 pt-10 flex flex-col text-left gap-4">
          <a
            href=""
            className="p-6 text-left border rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <p className="text-xl">
              What is the state of the art of our knowledge of the different species?
            </p>
          </a>

          <a
            href=""
            className="p-6 text-left border rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <p className="text-xl">
            Did you think what is magic mushrooms really?
            </p>
          </a>

          <a
            href=""
            className="p-6 text-left border rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <p className="text-xl">
            Do I have to be afraid of poisonous mushrooms?
            </p>
          </a>
          <h3 className="text-2xl font-bold">And many more questions that await an answer.</h3>
        
        </div>
        <footer className="flex items-center justify-center w-full h-24 border-t bg-[url('/bg.jpg')] bg-cover text-white">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with Love 🍄
        </a>
      </footer>
    </div>
    
  )
}

export default Home
