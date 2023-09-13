import {useEffect, useState} from 'react'
import './favoritos.css';
import { Link } from 'react-router-dom';

import {toast} from 'react-toastify'

function Favoritos(){

  const [filmes, setFilmes] = useState([]);

  useEffect(()=>{

    const localStorageArray = localStorage.getItem('@jokerflix');
    setFilmes(JSON.parse(localStorageArray) || []);
    
  },[])

  function deletarFilme(index){
    const newLocalStorage = [...filmes];
    newLocalStorage.splice(index, 1);
    setFilmes(newLocalStorage);
    localStorage.setItem('@jokerflix', JSON.stringify(newLocalStorage));
    toast.success('Filme removido com sucesso')
  }


  return(
    <div className='meus-filmes'>

      <h1>Meus filmes</h1>
      {filmes.length === 0 && <span>Voce nao possui nenhum filme salvo</span>}
      <ul>
        {filmes.map((filme)=>{
         return(
          <li key={filme.id}>
            <span>{filme.title}</span>
            <div>
              <Link className='text-color' to={`/filme/${filme.id}`}>Ver detalhes</Link>
              <button onClick={deletarFilme}>Excluir</button>
            </div>
          </li>
         )
        })}
      </ul>
    </div>
  )
}

export default Favoritos;