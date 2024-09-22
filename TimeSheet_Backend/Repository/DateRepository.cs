using Microsoft.EntityFrameworkCore;
using TimeSheetFullStack.Data;
using TimeSheetFullStack.Model;

namespace TimeSheetFullStack.Repository
{
    public class DateRepository : IDateRepository
    {
        private readonly TimeSheetDbContext _dbcontext;

        public DateRepository(TimeSheetDbContext dbcontext) 
        {
            _dbcontext = dbcontext;
        }

        public void AddActivity(Date date)
        {
            _dbcontext.Dates.Add(date);
            _dbcontext.SaveChanges();
        }

        public List<Date> GetActivities() 
        {
            return _dbcontext.Dates.Include(a => a.ActivityList).ToList();
        }

        //public void PutActivities(int id) 
        //{
        //    var Putid = _dbcontext.Dates.Find("DateId");
        //    Date date = new Date()
        //    {
        //        DateId = id,
        //        TodaysDate = 


        //    };
        //}
    }
}
