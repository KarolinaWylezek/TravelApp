using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CategoriesController : BaseApiController
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;
        public CategoriesController(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _mapper = mapper;
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {
             var categories = await _categoryRepository.GetCategories();
            return Ok(categories);

        }

        [HttpGet("{catId}")]
        public async Task<ActionResult<IEnumerable<SubcategoryDto>>> GetSubategories(int catId)
        {
             var subcategories = await _categoryRepository.GetSubategories(catId);
            return Ok(subcategories);

        }

        [HttpGet("subcategories")]
        public async Task<ActionResult<IEnumerable<string>>> GetAllSubcategories()
        {
             var categories = await _categoryRepository.GetAllSubategories();
            return Ok(categories);

        }

    }
}