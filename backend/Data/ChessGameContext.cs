using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.Models;

    public class ChessGameContext : DbContext
    {
        public ChessGameContext (DbContextOptions<ChessGameContext> options)
            : base(options)
        {
        }

        public DbSet<backend.Models.ChessGame> ChessGame { get; set; }
    }
