namespace TMS_API.Controllers
{
    public class QueryRequest
    {
        public QueryRequest() { }
        public QueryRequest(string value, string operation, string field)
        {
            switch (field)
            {
                case "ID":
                    Field = "employee.id";
                    break;
                case "FirstName":
                    Field = "employee.name_first";
                    break;
                case "LastName":
                    Field = "employee.name_last";
                    break;
                case "Date":
                    Field = "time_entry.date";
                    break;
                case "HoursWorked":
                    Field = "time_entry.hours_worked";
                    break;
                case "WeekStart":
                    Field = "time_entry.week_start_date";
                    break;
                default:
                    Field = "";
                    break;
            }

            switch(operation)
            {
                case "Eq":
                    Operation = "=";
                    break;
                case "nEq":
                    Operation = "<>";
                    break;
                case "less":
                case "before":
                    Operation = "<";
                    break;
                case "after":
                case "greater":
                    Operation = ">";
                    break;
                default:
                    Operation = "";
                    break;
            }

            Value = value;
        }
        public string Value;
        public string Operation;
        public string Field;
    }
}