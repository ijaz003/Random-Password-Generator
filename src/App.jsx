import { useCallback, useEffect, useState ,useRef} from 'react'


function App() {
  const [length,setLength] = useState(8);
  const [allowChar,setChar]=useState(false);
  const [allowNum,setNum]=useState(false);
  const [password,setPassword]=useState("");
  
  const passwordGenerator=useCallback(()=>
  {
    let pass="";
    let str="ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghjklmnopqrstuwxyz";
    if(allowNum) str+="0123456789";
    if(allowChar) str+="~!@#$%^&*()_{}[]";

    for(let i=0;i<length;i++)
    {
      let randChar=Math.floor(Math.random()*str.length);
      pass+=str.charAt(randChar);
    }
    setPassword(pass);
  },[length,allowChar,allowNum,setPassword])

  useEffect(()=>{
    passwordGenerator();
  },[length,allowChar,allowNum,setPassword]);
  let passwordRef=useRef(null);

  let copyPasswordToClipBoard=()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  };
  return (
    <>
      
      <div className="container" style={{width:"60%", padding:"20px 10px", border:"1px solid black",  borderRadius:"20px", backgroundColor:'blue'}}>
        <div className="Top" style={{display:"flex",justifyContent:'center'}}>
          <input ref={passwordRef}  type="text" value={password} readOnly style={{border:'none', outline:'none', width:'70%', height:'50px',borderRadius:'5px',color:'black'}}/>
          <button onClick={copyPasswordToClipBoard}  style={{borderRadius:'5px', color:'black',padding:'11px',marginLeft:'5px'}}>Copy Password</button>
        </div>

        <div className="Bottom" style={{marginTop:'30px',display:'flex',justifyContent:'center', gap:'50px'}}>
          <input type="range" min={1} max={100} id='Range' onChange={(i)=>{
            setLength(i.target.value)
          }} />
          <label htmlFor="Range">Length {length}</label>
          <input type="checkbox" id='allowchar' onChange={()=>setChar(prev=>!prev)}/>
          <label htmlFor="allowchar" style={{color:'white'}}>Allow Characters</label>

          <input type="checkbox" id='allownum' onChange={()=>setNum(prev=>!prev)}/>
          <label htmlFor="allownum" style={{color:'white'}}>Allow Numbers</label>
          
        </div>
      </div>

    </>
  )
}

export default App
