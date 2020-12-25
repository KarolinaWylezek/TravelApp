using System;
using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class UserTripDto
    {
        public int Id { get; set; }
        public string Place { get; set; }
        public DateTime TripDate { get; set; }
        public DateTime TripFinishDate { get; set; }
        public ICollection<AttractionDto> Attractions { get; set; }

    }
}