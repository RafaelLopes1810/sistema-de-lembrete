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
    }
}
