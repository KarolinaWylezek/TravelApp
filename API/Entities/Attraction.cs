using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Attractions")]
    public class Attraction
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Type { get; set; }
        public string Theme { get; set; }
        public string Subtheme { get; set; }
        public Trip Trip { get; set; }
        public int TripId { get; set; }
    }
}