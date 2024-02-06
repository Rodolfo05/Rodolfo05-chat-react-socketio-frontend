import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    console.log("Iniciado")

    const [username, setUsername] = useState(null);
    const [userID, setUserID] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
      generarIDUnico();
    }, [])
    

    const goToChat = () => {
        localStorage.setItem('user-'+userID, userID+"-"+username);
        console.log("userID: "+userID);
        navigate('chat', {state: userID});

    }

    const generarIDUnico = () => {

        // Obtener la fecha actual en milisegundos
        var timestamp = new Date().getTime();

        // Generar un número aleatorio entre 0 y 99999
        var randomNumber = Math.floor(Math.random() * 100000);

        // Concatenar la fecha actual y el número aleatorio, y luego tomar los primeros 5 caracteres
        var uniqueId = (timestamp + randomNumber).toString().substring(6, 12);
        console.log(uniqueId)
        setUserID(uniqueId);
    }


    //Guarda el nombre de usuario en localStorage


    return (
        <>
            <div className='container h-screen bg-zinc-800 text-white flex items-center justify-center items-center py-10 px-10 mx-0 min-w-full flex flex-col items-center'>

                <h1 className='text-2xl font-bold my-2'>Ingresa tu nombre de usuario:</h1>

                <input type='text' className='w-80 font-bold text-2xl  text-center border-2 border-zinc-500 p-2 w-full text-black mb-3' onChange={(e) => setUsername(e.target.value)} />

                <button onClick={goToChat} className='w-80 text-2xl text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2'>Entrar</button>

            </div>


        </>
    )
}
