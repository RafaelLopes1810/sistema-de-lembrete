using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using backend.Repositories;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace Backend.Tests
{
    public class LembreteRepositoryTests
    {
        private AppDbContext CriarContextoInMemory(string dbName)
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: dbName)
                .Options;

            return new AppDbContext(options);
        }

        [Fact]
        public async Task Adicionar_DevePersistirLembrete()
        {
            var contexto = CriarContextoInMemory(nameof(Adicionar_DevePersistirLembrete));
            var repo = new LembreteRepository(contexto);

            var lembrete = new Lembrete
            {
                Titulo = "Novo",
                Data = DateTime.Today.AddDays(1)
            };

            var resultado = await repo.Adicionar(lembrete);

            Assert.Equal("Novo", resultado.Titulo);
            Assert.Equal(1, contexto.Lembretes.Count());
        }

        [Fact]
        public async Task ObterPorId_DeveRetornarLembrete()
        {
            var contexto = CriarContextoInMemory(nameof(ObterPorId_DeveRetornarLembrete));
            var repo = new LembreteRepository(contexto);

            var lembrete = new Lembrete
            {
                Titulo = "Teste",
                Data = DateTime.Today.AddDays(1)
            };
            contexto.Lembretes.Add(lembrete);
            await contexto.SaveChangesAsync();

            var encontrado = await repo.ObterPorId(lembrete.Id);

            Assert.NotNull(encontrado);
            Assert.Equal(lembrete.Titulo, encontrado!.Titulo);
        }

        [Fact]
        public async Task ObterPorId_DeveRetornarNull_QuandoNaoExiste()
        {
            var contexto = CriarContextoInMemory(nameof(ObterPorId_DeveRetornarNull_QuandoNaoExiste));
            var repo = new LembreteRepository(contexto);

            var resultado = await repo.ObterPorId(999);

            Assert.Null(resultado);
        }

        [Fact]
        public async Task ObterTodos_DeveRetornarTodos()
        {
            var contexto = CriarContextoInMemory(nameof(ObterTodos_DeveRetornarTodos));
            contexto.Lembretes.AddRange(
                new Lembrete { Titulo = "A", Data = DateTime.Today.AddDays(1) },
                new Lembrete { Titulo = "B", Data = DateTime.Today.AddDays(2) }
            );
            await contexto.SaveChangesAsync();

            var repo = new LembreteRepository(contexto);
            var resultados = await repo.ObterTodos();

            Assert.Equal(2, resultados.Count());
        }

        [Fact]
        public async Task ObterFuturos_DeveRetornarSomenteDatasNoFuturo()
        {
            var contexto = CriarContextoInMemory(nameof(ObterFuturos_DeveRetornarSomenteDatasNoFuturo));
            contexto.Lembretes.AddRange(
                new Lembrete { Titulo = "Passado", Data = DateTime.Today.AddDays(-1) },
                new Lembrete { Titulo = "Hoje", Data = DateTime.Today },
                new Lembrete { Titulo = "Futuro", Data = DateTime.Today.AddDays(1) }
            );
            await contexto.SaveChangesAsync();

            var repo = new LembreteRepository(contexto);
            var resultados = await repo.ObterFuturos();

            Assert.Equal(2, resultados.Count()); // Hoje e Futuro
            Assert.DoesNotContain(resultados, l => l.Titulo == "Passado");
        }

        [Fact]
        public async Task Remover_DeveRetornarTrue_QuandoExiste()
        {
            var contexto = CriarContextoInMemory(nameof(Remover_DeveRetornarTrue_QuandoExiste));
            var lembrete = new Lembrete { Titulo = "Teste", Data = DateTime.Today.AddDays(1) };
            contexto.Lembretes.Add(lembrete);
            await contexto.SaveChangesAsync();

            var repo = new LembreteRepository(contexto);
            var resultado = await repo.Remover(lembrete.Id);

            Assert.True(resultado);
            Assert.Empty(contexto.Lembretes);
        }

        [Fact]
        public async Task Remover_DeveRetornarFalse_QuandoNaoExiste()
        {
            var contexto = CriarContextoInMemory(nameof(Remover_DeveRetornarFalse_QuandoNaoExiste));
            var repo = new LembreteRepository(contexto);

            var resultado = await repo.Remover(123);

            Assert.False(resultado);
        }
    }
}
