using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using backend.Models;
using Xunit;

namespace Backend.Tests
{
    public class LembreteTests
    {
        private List<ValidationResult> ValidateModel(Lembrete model)
        {
            var context = new ValidationContext(model, null, null);
            var results = new List<ValidationResult>();
            Validator.TryValidateObject(model, context, results, true);
            return results;
        }

        [Fact]
        public void Lembrete_Valido_DevePassarNaValidacao()
        {
            var lembrete = new Lembrete
            {
                Titulo = "Estudar testes",
                Data = DateTime.Now.AddDays(1)
            };

            var results = ValidateModel(lembrete);

            Assert.Empty(results);
        }

        [Fact]
        public void Lembrete_SemTitulo_DeveFalhar()
        {
            var lembrete = new Lembrete
            {
                Titulo = null,
                Data = DateTime.Now.AddDays(1)
            };

            var results = ValidateModel(lembrete);

            Assert.Contains(results, r => r.ErrorMessage.Contains("O título é obrigatório"));
        }

        [Fact]
        public void Lembrete_TituloMuitoLongo_DeveFalhar()
        {
            var lembrete = new Lembrete
            {
                Titulo = new string('A', 101),
                Data = DateTime.Now.AddDays(1)
            };

            var results = ValidateModel(lembrete);

            Assert.Contains(results, r => r.ErrorMessage.Contains("O título deve ter no máximo 100 caracteres"));
        }

        [Fact]
        public void Lembrete_DataPassada_DeveFalhar()
        {
            var lembrete = new Lembrete
            {
                Titulo = "Evento passado",
                Data = DateTime.Now.AddDays(-1)
            };

            var results = ValidateModel(lembrete);

            Assert.Contains(results, r => r.ErrorMessage.Contains("A data do lembrete deve ser no futuro"));
        }
    }
}
