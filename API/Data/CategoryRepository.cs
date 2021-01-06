using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CategoryRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<CategoryDto>> GetCategories()
        {
            var query = _context.Categories.AsQueryable();

            return await query.Select(query => new CategoryDto
            {
                Id = query.Id,
                Name = query.Name,
                Subcategories = query.Subcategories
                
            }).ToListAsync();
        }

        public async Task<IEnumerable<SubcategoryDto>> GetSubategories(int categoryId)
        {
            var query = _context.Subcategories.AsQueryable();

            query = query.Where(c => c.CategoryId == categoryId);

            return await query.Select(query => new SubcategoryDto
            {
                Id = query.Id,
                Name = query.Name,
                
            }).ToListAsync();
        }
    }

}