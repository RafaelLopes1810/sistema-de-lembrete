using System;
using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class CriarLembreteDto
    {
        [Required(ErrorMessage = "O título é obrigatório.")]
        [StringLength(100, ErrorMessage = "O título deve ter no máximo 100 caracteres.")]
        public string? Titulo { get; set; }

        [StringLength(500, ErrorMessage = "A descrição deve ter no máximo 500 caracteres.")]
        public string? Descricao { get; set; }

        [Required(ErrorMessage = "A data é obrigatória.")]
        public DateTime Data { get; set; }
    }
}