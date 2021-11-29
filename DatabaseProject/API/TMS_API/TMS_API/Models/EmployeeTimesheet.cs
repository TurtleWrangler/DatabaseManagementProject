using System;

namespace TMS_API
{
    public class EmployeeTimesheet
    {
        internal EmployeeTimesheet(string firstName, string lastName, DateTime date, int hoursWorked, string comments, DateTime submissionTime, DateTime weekStartDate)
        {
            FirstName = firstName;
            LastName = lastName;
            Date = date;
            HoursWorked = hoursWorked;
            Comments = comments;
            SubmissionTime = submissionTime;
            WeekStartDate = weekStartDate;
        }
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime Date { get; set; }

        public int HoursWorked { get; set; }

        public string Comments { get; set; }

        public DateTime SubmissionTime { get; set; }

        public DateTime WeekStartDate { get; set; }
    }
}
