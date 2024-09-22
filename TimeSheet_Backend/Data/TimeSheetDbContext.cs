using Microsoft.EntityFrameworkCore;
using TimeSheetFullStack.Model;

namespace TimeSheetFullStack.Data
{
    public class TimeSheetDbContext : DbContext
    {
        public DbSet<Date> Dates { get; set; }

        public DbSet<Activity> Activitys { get; set; }

        public TimeSheetDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions) { }

    }
}
