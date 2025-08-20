using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Lembrete : IValidatableObject
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O título é obrigatório.")]
        [StringLength(100, ErrorMessage = "O título deve ter no máximo 100 caracteres.")]
        public string Titulo { get; set; }

        [StringLength(500, ErrorMessage = "A descrição deve ter no máximo 500 caracteres.")]
        public string? Descricao { get; set; }

        [Required(ErrorMessage = "A data é obrigatória.")]
        public DateTime Data { get; set; }

        // Validação customizada com IValidatableObject
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Data < DateTime.Now)
            {
                yield return new ValidationResult(
                    "A data do lembrete deve ser no futuro.",
                    new[] { nameof(Data) }
                );
            }
        }
    }
}
