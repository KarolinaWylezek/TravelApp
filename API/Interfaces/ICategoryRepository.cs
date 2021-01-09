using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ICategoryRepository
    {
         Task<IEnumerable<CategoryDto>> GetCategories();
         Task<IEnumerable<SubcategoryDto>> GetSubategories(int categoryId);
         Task<IEnumerable<string>> GetAllSubategories();
    }
}