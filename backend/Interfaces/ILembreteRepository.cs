using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Interfaces
{
    public interface ILembreteRepository
    {
        Task<Lembrete> Adicionar(Lembrete lembrete);
        Task<IEnumerable<Lembrete>> ObterFuturos();
        Task<Lembrete?> ObterPorId(int id);
        Task<bool> Remover(int id);
    }
}
