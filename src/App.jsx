import { useEffect, useState } from 'react';
import io from 'socket.io-client'

const socket = io("https://chat-react-socketio-backend-production.up.railway.app");
//como el front y el backend corren en el mismo proyecto se cambia el codigo de arriba
//const socket = io("/");

export const App = () => {

  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);



  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoMensaje = {
      body: mensaje,
      from: 'Tu'
    }

    setMensajes([...mensajes, nuevoMensaje]);
    socket.emit('mensaje', mensaje);
  }

  useEffect(() => {
    socket.on('mensaje2', receiveMessage);


    return () => {
      socket.off('mensaje2', receiveMessage);
    };
  }, [])

  const receiveMessage = (mensaje) =>
    setMensajes((state) => [...state, mensaje]);


  return (
    <div className='h-screen bg-zinc-800 text-white flex items-center justify-center'>

      <form onSubmit={handleSubmit} className="bg-zinc-900 p-20">
        <h1 className='text-2xl font-bold my-2'>Chat en React:</h1>
        <input className='border-2 border-zinc-500 p-2 w-full text-black' type='text' onChange={(e) => setMensaje(e.target.value)} placeholder='Escribe tu mensaje...' />

        <ul>
          {
            mensajes.map((m, i) => (
              <li key={i} className={
                `my-2 p-2 table rounded-md ${m.from === 'Tu' ? 'bg-green-800 ml-auto' : 'bg-black'}`
              }>
                <span className='text-xs text-slate-300 block'>{m.from}:</span>
                <span className='text-md'>{m.body}</span>
              </li>
            ))
          }
        </ul>

      </form>


    </div>
  )
}
