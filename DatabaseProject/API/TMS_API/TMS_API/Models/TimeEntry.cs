using System;

namespace TMS_API
{
    public class TimeEntry
    {
        public string EmployeeID { get; set; }

        public DateTime Date { get; set; }

        public int HoursWorked { get; set; }

        public string Comments { get; set; }

        public DateTime SubmissionTime { get; set; }

        public DateTime WeekStartTime { get; set; }
    }
}
