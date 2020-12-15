using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Places")]
    public class Place
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string OpenTime { get; set; }
        public string CloseTime { get; set; }
        public string Theme { get; set; }
        public string Subtheme { get; set; }
        public double Rating { get; set; }
        public bool Promotion { get; set; }
        public City City { get; set; }
        public int CityId { get; set; }
    }
}