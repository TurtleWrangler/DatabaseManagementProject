using System;

namespace TMS_API
{
    public class Employee
    {
        public Employee() { }
        public Employee(string firstName, string lastName, string occupation, string email, string address, string phoneNumber, DateTime dateOfBirth, DateTime dateOfHire)
        {
            FirstName = firstName;
            LastName = lastName;
            Occupation = occupation;
            Email = email;
            Address = address;
            PhoneNumber = phoneNumber;
            DateOfBirth = dateOfBirth;
            DateOfHire = dateOfHire;
        }
        public string ID { get; set; }

        public string DeptID { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Occupation { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }

        public string PhoneNumber { get; set; }

        public string Password { get; set; }

        public DateTime DateOfBirth { get; set; }

        public DateTime DateOfHire { get; set; }

        public DateTime DateOfDismissal { get; set; }
    }
}
