using System;

namespace TMS_API
{
    public class TimeEntry
    {
        public TimeEntry() { }
        public TimeEntry(string id, DateTime date, float hoursWorked, string comments, DateTime submissionTime, DateTime weekStartDate)
        {
            EmployeeID = id;
            Date = date;
            HoursWorked = hoursWorked;
            Comments = comments;
            SubmissionTime = submissionTime;
            WeekStartDate = weekStartDate;
        }
        public string EmployeeID { get; set; }

        public DateTime Date { get; set; }

        public float? HoursWorked { get; set; }

        public string? Comments { get; set; }

        public DateTime SubmissionTime { get; set; }

        public DateTime WeekStartDate { get; set; }
    }
}
