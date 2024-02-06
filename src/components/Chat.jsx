import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client'

//PRODUCCION:
//const socket = io("https://chat-react-socketio-backend-production.up.railway.app");

//DESARROLLO:
const socket = io("http://localhost:4000");

//En el caso de que el front y el back esten en el mismo proyecto usar este codigo:
//const socket = io("/");


export const Chat = () => {

  const location = useLocation();

  const username = localStorage.getItem("user-"+location.state);
  const usernameSinId = username.replace(location.state+"-", '');


  

  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);



  const handleSubmit = (e) => {
   
    e.preventDefault();

    const nuevoMensaje = {
      mensaje,
      from: 'Tu',
      username
    }

    console.log(nuevoMensaje)
    // {body: 'holaaadaaa', from: 'Tu'}

    setMensajes([...mensajes, nuevoMensaje]);

    socket.emit('mensajeEnviado', nuevoMensaje);
    document.getElementById('inputText-chat').value = '';
  }

  useEffect(() => {
    socket.on('mensajeRecibido', receiveMessage);


    return () => {
      socket.off('mensajeRecibido', receiveMessage);
    };
  }, [])

  const receiveMessage = (mensaje) => {
    console.log(mensaje)
    setMensajes((state) => [...state, mensaje]);

  }


  return (

    <div className='h-screen bg-zinc-800 '>

      <div className='bg-zinc-800 text-white flex items-center justify-center items-center py-1 px-1  '>

        <h1 className='text-2xl font-bold my-2'>Bienvenido/a {usernameSinId}</h1>
      </div>



      <div className=' bg-zinc-800 text-white flex items-center justify-center'>


        <form onSubmit={handleSubmit} className="bg-zinc-900 p-20">

          <h1 className='text-2xl font-bold my-2'>Comienza a chatear:</h1>

          <input id='inputText-chat' className='border-2 border-zinc-500 p-2 w-full text-black' type='text' onChange={(e) => setMensaje(e.target.value)} placeholder='Escribe tu mensaje...' />

          <ul>
            {
              mensajes.map((m, i) => (
                <li key={i} className={
                  `my-2 p-2 table rounded-md ${m.from === 'Tu' ? 'bg-green-800 ml-auto' : 'bg-black'}`
                }>
                  <span className='text-xs text-slate-300 block'>{m.from}:</span>
                  <span className='text-md'>{m.mensaje}</span>
                </li>
              ))
            }
          </ul>

        </form>


      </div>
    </div>
  )
}
