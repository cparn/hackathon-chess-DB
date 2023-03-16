using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class ChessGame
{
    [Key]
    [Required]
    public int GameId { get; set; }
    [Required]
    public string Opponent { get; set; }
    [Required]
    public string Location { get; set; }
    [Required]
    public string Date { get; set; }
    [Required]
    public string GamePGN { get; set; }
    [Required]
    public string? Comments { get; set; }
}