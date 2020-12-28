using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class CitiesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        private readonly ICityRepository _cityRepository;
        public CitiesController(ICityRepository cityRepository, IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
            _cityRepository = cityRepository;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CityDto>>> GetCities([FromQuery] Params cityParams)
        {
            var cities = await _cityRepository.GetCitiesDtoAsync(cityParams);

            Response.AddPaginationHeader(cities.CurrentPage, cities.PageSize, cities.TotalCount, cities.TotalPages);

            return Ok(cities);

        }

        [HttpGet("{name}")]
        public async Task<ActionResult<CityDto>> GetCity(string name)
        {
            return await _cityRepository.GetCityDtoAsync(name);

        }

        [Authorize(Policy = "ModerateCitiesRole")]
        [HttpDelete("{name}")]
        public async Task<ActionResult> DeleteCity(string name)
        {
           _cityRepository.DeleteCity(name);

           if(await _cityRepository.SaveAllAsync()) return NoContent();

           return BadRequest("Failed to delete city");
           
        }

        [Authorize(Policy = "ModerateCitiesRole")]
        [HttpPost("add-city")]
        public async Task<ActionResult<City>> AddCity(AddCityDto addCityDto)
        {

            if (await CityExists(addCityDto.Name)) return BadRequest("City already exists");

           var city = new City
           {
               Name = addCityDto.Name.ToLower(),
               Country = addCityDto.Country,
               Continent = addCityDto.Continent,
               Description = addCityDto.Description

           };

           _context.Cities.Add(city);
           await _context.SaveChangesAsync();

           return city;
        }

        private async Task<bool> CityExists(string name) 
        {
            return await _context.Cities.AnyAsync(x => x.Name == name.ToLower());
        }
    }
}
