namespace TimeSheetFullStack.Model
{
    public class Activity
    {
        public int ActivityId { get; set; }
        public string Project { get; set; }
        public string SubProject { get; set; }
        public string Batch { get; set; }
        public int HoursRequired { get; set; }
        public string ActivityData { get; set; }
    }
}
