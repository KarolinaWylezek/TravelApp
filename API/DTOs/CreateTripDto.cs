using System;
using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class CreateTripDto
    {
        public string Place { get; set; }
        public DateTime TripDate { get; set; }
        public DateTime TripFinishDate { get; set; }
        public IList<string> Category { get; set; }
        //public string Category { get; set; }
        public IList<string> Subcategory { get; set; }
        //public string Subcategory { get; set; }
        public string StartOfSightseeing { get; set; }
        public string FinishOfSightseeing { get; set; }
    }
}