using System;

namespace TMS_API
{
    public class TimeSheet
    {
        public DateTime WeekStartDate { get; set; }

        public string EmployeeID { get; set; }

        public bool TimesheetApproved { get; set; }
    }
}
