using System.Collections.Generic;

namespace API.Entities
{
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public string Continent { get; set; }

        public string Description { get; set; }
        public ICollection<Place> Places { get; set; }
        public ICollection<Event> Events { get; set; }
    }
}