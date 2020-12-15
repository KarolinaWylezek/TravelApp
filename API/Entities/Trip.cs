using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("UserTrips")]
    public class Trip
    {
        public int Id { get; set; }
        public string Place { get; set; }
        public DateTime TripDate { get; set; } = DateTime.Now;
        public ICollection<Attraction> Attractions { get; set; }
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}