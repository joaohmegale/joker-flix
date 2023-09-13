import {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import './filme.css'

import { toast } from 'react-toastify';


function Filme(){
  const { id } = useParams();
  const navigation = useNavigate();

  const [filme, setFilme] = useState({})
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function loadFilme(){
      await api.get(`/movie/${id}`,{
        params:{
          api_key: "10ec0fbeb40af2e6d2c290ef04762804",
          language: "pt-BR",
        }
      })
      .then((response)=>{
        setFilme(response.data)
        setLoading(false)
      })
      .catch(()=>{
        navigation('/', { replace:true });
        return;
      })
    }

    loadFilme();

    return () => {
      console.log('destruido')
    }

  }, [navigation, id])

  function salvarFilme(){
    const minhaLista = localStorage.getItem('@jokerflix');
    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some((filmesSalvos)=>filmesSalvos.id===filme.id);

    if (hasFilme) {
      toast.warn('Filme ja esta na lista');
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem('@jokerflix', JSON.stringify(filmesSalvos));
    toast.success('Filme salvo com sucesso')
  }
  
  if (loading) {
    return(
      <div className='filme-info'>
        <h1>Carregando informações...</h1>
      </div>
    )
  }

  return(
    <div className='filme-info'>
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <h4>Nota: {filme.vote_average}</h4>

      <div className='area-buttons'>
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}

export default Filme;