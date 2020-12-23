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
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class CitiesController : BaseApiController
    {
        private readonly IMapper _mapper;

        private readonly ICityRepository _cityRepository;
        public CitiesController(ICityRepository cityRepository, IMapper mapper)
        {
            _mapper = mapper;
            _cityRepository = cityRepository;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CityDto>>> GetCities([FromQuery]Params cityParams)
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
    }
}