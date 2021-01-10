using System;

namespace API.DTOs
{
    public class AttractionDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Type { get; set; }
        public string Theme { get; set; }
        public string Subtheme { get; set; }
        public DateTime DateTimeOfVisit { get; set; }
        public bool WasVisited { get; set; }
       
    }
}