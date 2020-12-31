using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Events")]
    public class Event
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime FinishTime { get; set; }
        public string Theme { get; set; }
        public string Subtheme { get; set; }
        public string ExpectedTimeSpent { get; set; }
        public City City { get; set; }
        public int CityId { get; set; }
    }
}