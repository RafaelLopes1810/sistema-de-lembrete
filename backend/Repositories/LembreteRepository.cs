using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class LembreteRepository : ILembreteRepository
    {
        private readonly AppDbContext _context;

        public LembreteRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Lembrete> Adicionar(Lembrete lembrete)
        {
            _context.Lembretes.Add(lembrete);
            await _context.SaveChangesAsync();
            return lembrete;
        }

        public async Task<IEnumerable<Lembrete>> ObterFuturos()
        {
            var hoje = DateTime.Today;
            return await _context.Lembretes
                .Where(l => l.Data.Date >= hoje)
                .OrderBy(l => l.Data)
                .ThenBy(l => l.Titulo ?? string.Empty)
                .ToListAsync();
        }

        public async Task<Lembrete?> ObterPorId(int id)
        {
            return await _context.Lembretes.FindAsync(id);
        }

        public async Task<bool> Remover(int id)
        {
            var existente = await ObterPorId(id);
            if (existente is null) return false;
            _context.Lembretes.Remove(existente);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
