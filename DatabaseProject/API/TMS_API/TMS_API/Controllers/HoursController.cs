using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using MySql.Data;
using MySql.Data.MySqlClient;
using TMS_API.Attributes;

namespace TMS_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HoursController : ControllerBase
    {
        private static MySqlConnection Connection = new MySqlConnection("server=173.90.136.43;user=brandon;database=tms;port=3306;password=P@ssw0rd");
        
        [Authorization]
        [HttpGet]
        public IEnumerable<TimeEntry> GetHours()
        {
            string userId = (string)HttpContext.Items["User"];
            Connection.Open();
            string query = "SELECT * FROM time_entry WHERE employee_id = @id";
            MySqlCommand cmd = new MySqlCommand(query, Connection);

            cmd.Parameters.Add("@id", MySqlDbType.VarChar, 36).Value = userId;

            using MySqlDataReader rdr = cmd.ExecuteReader();

            List<TimeEntry> timeEntry = new List<TimeEntry>();

            while (rdr.Read())
            {
                timeEntry.Add(new TimeEntry(rdr.GetString(0), rdr.GetDateTime(1), rdr.GetInt32(2), rdr.GetString(3), rdr.GetDateTime(4), rdr.GetDateTime(5)));
            }

            Connection.Close();
            return timeEntry;
        }

        [Route("{startOfWeek}")]
        [Authorization]
        [HttpGet]
        public IEnumerable<TimeEntry> GetHoursByWeek(string startOfWeek)
        {
            string userId = (string)HttpContext.Items["User"];
            Connection.Open();
            string query = "SELECT * FROM time_entry WHERE week_start_date = @startOfWeek AND employee_id = @id";
            MySqlCommand cmd = new MySqlCommand(query, Connection);
            cmd.Parameters.Add("@startOfWeek", MySqlDbType.Date, 45).Value = startOfWeek;
            cmd.Parameters.Add("@id", MySqlDbType.VarChar, 36).Value = userId;

            using MySqlDataReader rdr = cmd.ExecuteReader();

            List<TimeEntry> timeEntry = new List<TimeEntry>();

            while (rdr.Read())
            {
                timeEntry.Add(new TimeEntry(rdr.GetString(0), rdr.GetDateTime(1), rdr.GetInt32(2), rdr.GetString(3), rdr.GetDateTime(4), rdr.GetDateTime(5)));
            }

            Connection.Close();
            return timeEntry;
        }

        [HttpPost]
        [Authorization]
        public void Hours(TimeEntry[] timeEntries)
        {
            string userId = (string)HttpContext.Items["User"];
            Connection.Open();

            string query = "INSERT IGNORE INTO timesheet VALUES(@week_start_date,@employee_id,0)";
            MySqlCommand cmd_timesheet = new MySqlCommand(query, Connection);
            cmd_timesheet.Parameters.Add("@week_start_date", MySqlDbType.DateTime).Value = timeEntries[0].WeekStartDate;
            cmd_timesheet.Parameters.Add("@employee_id", MySqlDbType.VarChar, 36).Value = userId;
            cmd_timesheet.ExecuteNonQuery();          

            MySqlTransaction myTrans;
            myTrans = Connection.BeginTransaction();

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
                MySqlCommand cmd = new MySqlCommand(query, Connection, myTrans);
                cmd.Parameters.Add("@week_start_date", MySqlDbType.DateTime).Value = timeEntries[0].WeekStartDate;
                cmd.Parameters.Add("@employee_id", MySqlDbType.VarChar, 36).Value = userId;
                cmd.Parameters.Add("@date", MySqlDbType.Date).Value = timeEntry.Date;
                cmd.Parameters.Add("@hours_worked", MySqlDbType.Decimal).Value = timeEntry.HoursWorked;
                cmd.Parameters.Add("@comments", MySqlDbType.Text).Value = timeEntry.Comments;
                cmd.ExecuteNonQuery();
            }

            myTrans.Commit();
            Connection.Close();
        }
    }
}
