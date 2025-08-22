using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;
using Moq;

using backend.Controllers;
using backend.Interfaces;
using backend.Models;
using backend.DTOs;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.AspNetCore.Http;

namespace Backend.Tests
{
    public class LembreteControllerTests
    {
        private readonly Mock<ILembreteRepository> _mockRepo;
        private readonly LembreteController _controller;

        public LembreteControllerTests()
        {
            _mockRepo = new Mock<ILembreteRepository>();
            _controller = new LembreteController(_mockRepo.Object);

            // Contexto mínimo para TryValidateModel funcionar sem NRE
            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext()
            };

            var validator = new Mock<IObjectModelValidator>();
            validator
                .Setup(v => v.Validate(
                    It.IsAny<ActionContext>(),
                    It.IsAny<ValidationStateDictionary>(),
                    It.IsAny<string>(),
                    It.IsAny<object>()))
                .Callback<ActionContext, ValidationStateDictionary, string, object>((_, __, ___, ____) =>
                {});

            _controller.ObjectValidator = validator.Object;
        }

        [Fact]
        public async Task Listar_DeveRetornarOkComLista()
        {
            var lembretes = new List<Lembrete>
            {
                new Lembrete { Id = 1, Titulo = "Teste 1", Data = DateTime.Today.AddDays(1) },
                new Lembrete { Id = 2, Titulo = "Teste 2", Data = DateTime.Today.AddDays(2) }
            };
            _mockRepo.Setup(r => r.ObterFuturos()).ReturnsAsync(lembretes);

            var resultado = await _controller.Listar();

            var ok = Assert.IsType<OkObjectResult>(resultado.Result);
            var valor = Assert.IsAssignableFrom<IEnumerable<Lembrete>>(ok.Value);
            Assert.Equal(2, valor.Count());
        }

        [Fact]
        public async Task GetAtivos_DeveRetornarOkComLista()
        {
            var lembretes = new List<Lembrete>
            {
                new Lembrete { Id = 1, Titulo = "A", Data = DateTime.Today.AddDays(1) },
                new Lembrete { Id = 2, Titulo = "B", Data = DateTime.Today.AddDays(2) }
            };
            _mockRepo.Setup(r => r.ObterFuturos()).ReturnsAsync(lembretes);

            var resultado = await _controller.GetAtivos();

            var ok = Assert.IsType<OkObjectResult>(resultado.Result);
            var valor = Assert.IsAssignableFrom<IEnumerable<Lembrete>>(ok.Value);
            Assert.Equal(2, valor.Count());
        }

        [Fact]
        public async Task Obter_DeveRetornarOk_QuandoEncontrado()
        {
            var lembrete = new Lembrete { Id = 1, Titulo = "Teste", Data = DateTime.Today.AddDays(1) };
            _mockRepo.Setup(r => r.ObterPorId(1)).ReturnsAsync(lembrete);

            var resultado = await _controller.Obter(1);

            var ok = Assert.IsType<OkObjectResult>(resultado.Result);
            var valor = Assert.IsType<Lembrete>(ok.Value);
            Assert.Equal(lembrete.Id, valor.Id);
        }

        [Fact]
        public async Task Obter_DeveRetornarNotFound_QuandoNaoEncontrado()
        {
            _mockRepo.Setup(r => r.ObterPorId(99)).ReturnsAsync((Lembrete?)null);

            var resultado = await _controller.Obter(99);

            Assert.IsType<NotFoundResult>(resultado.Result);
        }

        [Fact]
        public async Task Criar_DeveRetornarCreated()
        {
            var dto = new CriarLembreteDto
            {
                Titulo = "Novo Lembrete",
                Data = DateTime.Today.AddDays(1)
            };

            var criado = new Lembrete { Id = 1, Titulo = dto.Titulo, Data = dto.Data };
            _mockRepo.Setup(r => r.Adicionar(It.IsAny<Lembrete>())).ReturnsAsync(criado);

            var resultado = await _controller.Criar(dto);

            var created = Assert.IsType<CreatedAtRouteResult>(resultado.Result);
            var valor = Assert.IsType<Lembrete>(created.Value);
            Assert.Equal("ObterLembrete", created.RouteName);
            Assert.Equal(dto.Titulo, valor.Titulo);
        }

        [Fact]
        public async Task Remover_DeveRetornarNoContent_QuandoEncontrado()
        {
            _mockRepo.Setup(r => r.Remover(1)).ReturnsAsync(true);

            var resultado = await _controller.Remover(1);

            Assert.IsType<NoContentResult>(resultado);
        }

        [Fact]
        public async Task Remover_DeveRetornarNotFound_QuandoNaoEncontrado()
        {
            _mockRepo.Setup(r => r.Remover(1)).ReturnsAsync(false);

            var resultado = await _controller.Remover(1);

            Assert.IsType<NotFoundResult>(resultado);
        }

        [Fact]
        public async Task RemoverVencidos_DeveRemoverItensVencidos()
        {
            var hoje = DateTime.Today;
            var lembretes = new List<Lembrete>
            {
                new Lembrete { Id = 1, Titulo = "Passado", Data = hoje.AddDays(-1) },
                new Lembrete { Id = 2, Titulo = "Futuro",  Data = hoje.AddDays(1) }
            };

            _mockRepo.Setup(r => r.ObterTodos()).ReturnsAsync(lembretes);
            _mockRepo.Setup(r => r.Remover(1)).ReturnsAsync(true);

            var resultado = await _controller.RemoverVencidos();

            Assert.IsType<NoContentResult>(resultado);
            _mockRepo.Verify(r => r.Remover(1), Times.Once);
            _mockRepo.Verify(r => r.Remover(2), Times.Never);
        }
    }
}
