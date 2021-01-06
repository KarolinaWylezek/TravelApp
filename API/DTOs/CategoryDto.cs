using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Subcategory> Subcategories { get; set; }
    }
}