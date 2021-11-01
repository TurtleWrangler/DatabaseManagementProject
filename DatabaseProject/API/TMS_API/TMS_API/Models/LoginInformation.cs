using System;

namespace TMS_API
{
    public class LoginInformation
    {
        public string Username { get; set; }

        public string EmployeeID { get; set; }

        public string Password { get; set; }

        public bool IsManager { get; set; }
    }
}
