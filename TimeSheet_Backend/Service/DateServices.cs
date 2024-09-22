using TimeSheetFullStack.Model;
using TimeSheetFullStack.Repository;

namespace TimeSheetFullStack.Service
{
    public class DateServices : IDateSerivces
    {
        private readonly IDateRepository _dateRepository;

        public DateServices(IDateRepository dateRepository) 
        {
            _dateRepository = dateRepository;
        }

        public void AddActivityServices(Date date)
        {
            _dateRepository.AddActivity(date);
        }

        public List<Date> GetActivityServices() 
        {
            return _dateRepository.GetActivities();
        }

    }
}
