using System;

namespace API.DTOs
{
    public class TripDto
    {
        public int Id { get; set; }
        public string Place { get; set; }
        public DateTime TripDate { get; set; }
        public DateTime TripFinishDate { get; set; }
    }
}