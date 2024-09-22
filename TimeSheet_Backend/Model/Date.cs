namespace TimeSheetFullStack.Model
{
    public class Date
    {
        public int DateId { get; set; }
        public DateOnly TodaysDate { get; set; }
        public bool OnLeave { get; set; }
        public List<Activity> ActivityList { get; set; }
    }
}
