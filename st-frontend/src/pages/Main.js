import Body from '../components/Body'
import Header from '../components/Header'
import React from 'react'

const Main = () => {
  return (
    <div className="bg-[#012946] h-fit">
    <Header/>
    <Body/>
    <footer className="text-[12px] text-center w-full bottom-8 absolute">
        Using lukePeavy's quotable API.
    </footer>
</div>
  )
}

export default Main

