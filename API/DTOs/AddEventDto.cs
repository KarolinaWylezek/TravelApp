using System;

namespace API.DTOs
{
    public class AddEventDto
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime FinishTime { get; set; }
        public string Theme { get; set; }
        public string Subtheme { get; set; }
    }
}