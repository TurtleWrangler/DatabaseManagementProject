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
        public IEnumerable<TimeEntry> GetHours()
        {
            string userId = (string)HttpContext.Items["User"];
            _connectionService.Connect();
            string query = "SELECT * FROM time_entry WHERE employee_id = @id";
            MySqlCommand cmd = new MySqlCommand(query, _connectionService.Connection);

            cmd.Parameters.Add("@id", MySqlDbType.VarChar, 36).Value = userId;

            using MySqlDataReader rdr = cmd.ExecuteReader();

            List<TimeEntry> timeEntry = new List<TimeEntry>();

            while (rdr.Read())
            {
                timeEntry.Add(new TimeEntry(rdr.GetString(0), rdr.GetDateTime(1), rdr.GetInt32(2), rdr.GetString(3), rdr.GetDateTime(4), rdr.GetDateTime(5)));
            }

            return timeEntry;
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
