import React, { useCallback, useEffect, useRef, useState } from 'react'

function App() {

  const [password, setPassword] = useState("");
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [length, setLength] = useState(8);

  const passwordRef = useRef("");

  const copyPassword = ()=>{
      passwordRef.current?.select();
      navigator.clipboard.writeText(password);
  };

  const passwordGenerator = useCallback(() => {
    let pass= "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(numbers) str += "0123456789";
    if(symbols) str += "!@#$%^&*?\/-_";

    for(let i = 1; i<=length; i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str[char];
    }
    setPassword(pass);
  }, [length, symbols, numbers]);
  
  useEffect(()=>{
    passwordGenerator();
  }, [passwordGenerator])


  return (
    <>
      <div className="bg-slate-950 w-screen h-screen text-white">
        <h1 className='text-4xl text-center pt-30 text-white font-semibold'>Password Generator</h1>
        <div className="container p-4 w-screen justify-center flex flex-col">
          <div className="flex justify-center gap-5 p-10">
            <input type="text" ref={passwordRef} value={password} placeholder='Password' readOnly className='bg-white text-black outline-none rounded-sm text-center w-[75vw]' />
            <a onClick={copyPassword} className='bg-blue-500 py-2 px-4 rounded-sm text-white cursor-pointer hover:bg-blue-700'>Copy</a>
          </div>
          <div className="flex flex-row gap-5 justify-center items-center mt-5">
            <div className="flex items-center h-full flex-row justify-center gap-2 text-xl">
              <input type="range" id='range' value={length} min={6} max={100} onChange={(e)=> setLength(Number(e.target.value))} />
              <label htmlFor="range" className='cursor-pointer'>{length}</label>
            </div>
            <div className="flex items-center h-full flex-row justify-center gap-2 text-xl">
              <input type="checkbox" onChange={()=>{setNumbers((prev)=> !prev)}} checked={numbers} id='number' className='cursor-pointer' />
              <label htmlFor="number" className='cursor-pointer'>Numbers</label>
            </div>
            <div className="flex items-center h-full flex-row justify-center gap-2 text-xl">
              <input type="checkbox" onChange={()=>{setSymbols((prev)=>!prev)}} checked={symbols} id='symbol' className='cursor-pointer' />
              <label htmlFor="symbol" className='cursor-pointer'>Symbols</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App