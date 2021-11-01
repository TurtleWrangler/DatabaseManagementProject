using System;
using System.Data;

using MySql.Data;
using MySql.Data.MySqlClient;

namespace server
{
    public class MySqlConn
    {
        public static void Main()
        {
            string connStr = "server=173.90.136.43;user=brandon;database=tms;port=3306;password=P@ssw0rd";
            MySqlConnection conn = new MySqlConnection(connStr);
            try
            {
                Console.WriteLine("Connecting to MySQL...");
                conn.Open();
                while(true)
                {

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                conn.Close();
            }
        }
    }
}

