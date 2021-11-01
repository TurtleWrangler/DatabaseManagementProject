using System;

namespace TMS_API
{
    public class Employee
    {
        public string ID { get; set; }

        public string DeptID { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Occupation { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }

        public string PhoneNumber { get; set; }

        public DateTime DateOfBirth { get; set; }

        public DateTime DateOfHire { get; set; }

        public DateTime DateOfDismissal { get; set; }
    }
}
