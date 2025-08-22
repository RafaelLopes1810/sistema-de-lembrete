using Microsoft.AspNetCore.Mvc;
using backend.DTOs;
using backend.Models;
using backend.Interfaces;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LembreteController : ControllerBase
    {
        private readonly ILembreteRepository _repositorio;

        public LembreteController(ILembreteRepository repositorio)
        {
            _repositorio = repositorio;
        }

        // GET: /api/lembrete
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Lembrete>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Lembrete>>> Listar()
        {
            var itens = await _repositorio.ObterFuturos();
            return Ok(itens);
        }

        // GET: /api/lembrete/5
        [HttpGet("{id:int}", Name = "ObterLembrete")]
        [ProducesResponseType(typeof(Lembrete), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Lembrete>> Obter(int id)
        {
            var item = await _repositorio.ObterPorId(id);
            if (item is null) return NotFound();
            return Ok(item);
        }

        // GET: /api/lembrete/ativos
        [HttpGet("ativos")]
        public async Task<ActionResult<IEnumerable<Lembrete>>> GetAtivos()
        {
            var lembretes = await _repositorio.ObterFuturos();
            return Ok(lembretes);
        }


        // POST: /api/lembrete
        [HttpPost]
        [ProducesResponseType(typeof(Lembrete), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Lembrete>> Criar([FromBody] CriarLembreteDto dto)
        {
            var novo = new Lembrete
            {
                Titulo = dto.Titulo,
                Data = dto.Data
            };

            // Validações customizadas do Model (IValidatableObject)
            TryValidateModel(novo);
            if (!ModelState.IsValid) return ValidationProblem(ModelState);

            var criado = await _repositorio.Adicionar(novo);

            return CreatedAtRoute("ObterLembrete", new { id = criado.Id }, criado);
        }

        // DELETE: /api/lembrete/5
        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Remover(int id)
        {
            var ok = await _repositorio.Remover(id);
            if (!ok) return NotFound();
            return NoContent();
        }

        // DELETE: /api/lembrete/vencidos
        [HttpDelete("vencidos")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> RemoverVencidos()
        {
            var hoje = DateTime.Today;
            var lembretes = await _repositorio.ObterTodos();

            var vencidos = lembretes.Where(l => l.Data.Date < hoje).ToList();

            foreach (var l in vencidos)
            {
                await _repositorio.Remover(l.Id);
            }

            return NoContent();
        }
    }
}
