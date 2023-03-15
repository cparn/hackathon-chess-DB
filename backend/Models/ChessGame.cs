using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class ChessGame
{
    [Key]
    public int GameId { get; set; }
    public string Opponent { get; set; }
    public string Date { get; set; }
    public string GamePGN { get; set; }
    public string? Comments { get; set; }
}