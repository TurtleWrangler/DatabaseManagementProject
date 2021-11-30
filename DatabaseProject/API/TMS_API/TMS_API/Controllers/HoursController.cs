using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using MySql.Data;
using MySql.Data.MySqlClient;
using TMS_API.Attributes;
using TMS_API.Services;

namespace TMS_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HoursController : ControllerBase
    {
        private ConnectionService _connectionService = new ConnectionService();
        [Authorization]
        [HttpGet]
        public IEnumerable<EmployeeTimesheet> GetHours()
        {
            string userId = (string)HttpContext.Items["User"];
            _connectionService.Connect();
            string query = "SELECT name_first, name_last, date, hours_worked, comments, week_start_date, submission_time FROM employee JOIN time_entry WHERE employee.id = time_entry.employee_id;";
            MySqlCommand cmd = new MySqlCommand(query, _connectionService.Connection);

            cmd.Parameters.Add("@id", MySqlDbType.VarChar, 36).Value = userId;

            using MySqlDataReader rdr = cmd.ExecuteReader();

            List<EmployeeTimesheet> employeeTimesheet = new List<EmployeeTimesheet>();

            while (rdr.Read())
            {
                employeeTimesheet.Add(new EmployeeTimesheet(rdr.GetString(0), rdr.GetString(1), rdr.GetDateTime(2), rdr.GetInt32(3), rdr.GetString(4), rdr.GetDateTime(5), rdr.GetDateTime(6)));
            }

            return employeeTimesheet;
        }

        [Route("search")]
        [Authorization]
        [HttpPut]
        public IEnumerable<EmployeeTimesheet> Search(QueryRequest request)
        {
            QueryRequest sanitizedRequest = new QueryRequest(request.Value, request.Operation, request.Field);
            if (sanitizedRequest.Operation == "" || sanitizedRequest.Field == "")
            {
                return new List<EmployeeTimesheet>();
            }

            string userId = (string)HttpContext.Items["User"];
            _connectionService.Connect();
            string query = $"SELECT name_first, name_last, date, hours_worked, comments, week_start_date, submission_time FROM employee JOIN time_entry WHERE employee.id = time_entry.employee_id AND {sanitizedRequest.Field} {sanitizedRequest.Operation} @value;";
            MySqlCommand cmd = new MySqlCommand(query, _connectionService.Connection);

            cmd.Parameters.Add("@id", MySqlDbType.VarChar, 36).Value = userId;

            if(sanitizedRequest.Field == "time_entry.date" || sanitizedRequest.Field == "time_entry.week_start_date")
            {
                cmd.Parameters.Add("@value", MySqlDbType.Date).Value = sanitizedRequest.Value;
            }
            else if(sanitizedRequest.Field == "time_entry.hours_worked")
            {
                cmd.Parameters.Add("@value", MySqlDbType.Decimal).Value = sanitizedRequest.Value;

            }
            else
            {
                cmd.Parameters.Add("@value", MySqlDbType.VarChar, 36).Value = sanitizedRequest.Value;
            }

            using MySqlDataReader rdr = cmd.ExecuteReader();

            List<EmployeeTimesheet> employeeTimesheet = new List<EmployeeTimesheet>();

            while (rdr.Read())
            {
                employeeTimesheet.Add(new EmployeeTimesheet(rdr.GetString(0), rdr.GetString(1), rdr.GetDateTime(2), rdr.GetInt32(3), rdr.GetString(4), rdr.GetDateTime(5), rdr.GetDateTime(6)));
            }

            return employeeTimesheet;
        }

        [Route("{startOfWeek}")]
        [Authorization]
        [HttpGet]
        public IEnumerable<TimeEntry> GetHoursByWeek(string startOfWeek)
        {
            string userId = (string)HttpContext.Items["User"];

            _connectionService.Connect();

            string query = "SELECT * FROM time_entry WHERE week_start_date = @startOfWeek AND employee_id = @id";
            MySqlCommand cmd = new MySqlCommand(query, _connectionService.Connection);
            cmd.Parameters.Add("@startOfWeek", MySqlDbType.Date, 45).Value = startOfWeek;
            cmd.Parameters.Add("@id", MySqlDbType.VarChar, 36).Value = userId;

            using MySqlDataReader rdr = cmd.ExecuteReader();

            List<TimeEntry> timeEntry = new List<TimeEntry>();

            while (rdr.Read())
            {
                timeEntry.Add(new TimeEntry(rdr.GetString(0), rdr.GetDateTime(1), rdr.GetInt32(2), rdr.GetString(3), rdr.GetDateTime(4), rdr.GetDateTime(5)));
            }

            return timeEntry;
        }

        [HttpPost]
        [Authorization]
        public void Hours(TimeEntry[] timeEntries)
        {
            string userId = (string)HttpContext.Items["User"];

            _connectionService.Connect();

            string query = "INSERT IGNORE INTO timesheet VALUES(@week_start_date,@employee_id,0)";
            MySqlCommand cmd_timesheet = new MySqlCommand(query, _connectionService.Connection);
            cmd_timesheet.Parameters.Add("@week_start_date", MySqlDbType.DateTime).Value = timeEntries[0].WeekStartDate;
            cmd_timesheet.Parameters.Add("@employee_id", MySqlDbType.VarChar, 36).Value = userId;
            cmd_timesheet.ExecuteNonQuery();          

            MySqlTransaction myTrans;
            myTrans = _connectionService.Connection.BeginTransaction();

            query = "INSERT INTO time_entry(employee_id,date,hours_worked,comments,week_start_date) VALUES(@employee_id, @date, @hours_worked, @comments, @week_start_date) ON DUPLICATE KEY" +
                " UPDATE hours_worked = @hours_worked, comments = @comments";
            
            foreach (TimeEntry timeEntry in timeEntries)
            {
                if(string.IsNullOrWhiteSpace(timeEntry.Comments) && timeEntry.HoursWorked == null)
                {
                    continue;
                }
                if(timeEntry.HoursWorked == null)
                {
                    timeEntry.HoursWorked = 0;
                }
                MySqlCommand cmd = new MySqlCommand(query, _connectionService.Connection, myTrans);
                cmd.Parameters.Add("@week_start_date", MySqlDbType.DateTime).Value = timeEntries[0].WeekStartDate;
                cmd.Parameters.Add("@employee_id", MySqlDbType.VarChar, 36).Value = userId;
                cmd.Parameters.Add("@date", MySqlDbType.Date).Value = timeEntry.Date;
                cmd.Parameters.Add("@hours_worked", MySqlDbType.Decimal).Value = timeEntry.HoursWorked;
                cmd.Parameters.Add("@comments", MySqlDbType.Text).Value = timeEntry.Comments;
                cmd.ExecuteNonQuery();
            }

            myTrans.Commit();
        }
    }
}
