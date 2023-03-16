using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChessGameController : ControllerBase
    {
        private readonly ChessGameContext _context;

        public ChessGameController(ChessGameContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChessGame>>> GetChessGame()
        {
            return await _context.ChessGame.ToListAsync();
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<ChessGame>> GetChessGame(int id)
        {
            var chessGame = await _context.ChessGame.FindAsync(id);

            if (chessGame == null)
            {
                return NotFound();
            }

            return chessGame;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutChessGame(int id, ChessGame chessGame)
        {
            if (id != chessGame.GameId)
            {
                return BadRequest();
            }

            _context.Entry(chessGame).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChessGameExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<ChessGame>> PostChessGame(ChessGameRequest gameRequest)
        {
            var newGame = new ChessGame()
            {
                Opponent = gameRequest.Opponent,
                Date = gameRequest.Date,
                Location = gameRequest.Location,
                GamePGN = gameRequest.GamePGN,
                Comments = gameRequest.Comments
            };
            var response = _context.ChessGame.Add(newGame);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetChessGame), new { id = response.Entity.GameId }, response.Entity);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChessGame(int id)
        {
            var chessGame = await _context.ChessGame.FindAsync(id);
            if (chessGame == null)
            {
                return NotFound();
            }

            _context.ChessGame.Remove(chessGame);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ChessGameExists(int id)
        {
            return _context.ChessGame.Any(e => e.GameId == id);
        }
    }
}
