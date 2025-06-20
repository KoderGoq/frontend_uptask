import { adduserToProject } from '@/api/TeamApi';
import type { TeamMember } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


type SearchResultProps = {
  user: TeamMember
  reset: () => void
}

const SearchResult = ({ user, reset }: SearchResultProps) => {

  const navigate = useNavigate(); // Para cerrar el modal luego de agrear un colaborador
  const params = useParams();
  const projectId = params.projectId!;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: adduserToProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
      navigate(location.pathname, { replace: true })
      queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId] })
    }
  })

  const handleAddUserToProject = () => {
    const data = {
      projectId,
      id: user._id
    }
    mutate(data);
  }


  return (
    <>
      <p className='mt-10 text-center font-bold'>Resultado :</p>
      <div className='flex justify-between items-center'>
        <p>{user.name}</p>
        <button className='text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer'
          onClick={handleAddUserToProject}
        >Agregar al proyecto
        </button>
      </div>
    </>
  )
}

export default SearchResult
