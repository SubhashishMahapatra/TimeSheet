using TimeSheetFullStack.Model;

namespace TimeSheetFullStack.Service
{
    public interface IDateSerivces
    {
        public void AddActivityServices(Date date);
        public List<Date> GetActivityServices();
    }
}
