using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class ChessGameRequest
{
    [Required]
    public string Opponent { get; set; }
    [Required]
    public string Date { get; set; }
    [Required]
    public string GamePGN { get; set; }
    public string? Comments { get; set; }
}