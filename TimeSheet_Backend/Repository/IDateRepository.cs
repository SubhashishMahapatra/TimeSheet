using Microsoft.EntityFrameworkCore;
using TimeSheetFullStack.Model;

namespace TimeSheetFullStack.Repository
{
    public interface IDateRepository
    {
        public void AddActivity(Date date);
        public List<Date> GetActivities();
    }
}
