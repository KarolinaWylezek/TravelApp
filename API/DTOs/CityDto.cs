using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class CityDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public string Continent { get; set; }
        public string Description { get; set; }
        public ICollection<PlaceDto> Places { get; set; }
        public ICollection<EventDto> Events { get; set; }
    }
}