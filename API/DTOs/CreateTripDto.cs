using System;

namespace API.DTOs
{
    public class CreateTripDto
    {
        public string Place { get; set; }
        public DateTime TripDate { get; set; }
        public DateTime TripFinishDate { get; set; }
        public string Category { get; set; }
        public string Subcategory { get; set; }
    }
}