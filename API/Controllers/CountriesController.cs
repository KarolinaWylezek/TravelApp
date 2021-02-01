using System.Collections.Generic;
using System.Threading.Tasks;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CountriesController : BaseApiController
    {
        private readonly ICityRepository _cityRepository;
        private readonly IMapper _mapper;
        public CountriesController(ICityRepository cityRepository, IMapper mapper)
        {
            _mapper = mapper;
            _cityRepository = cityRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<string>> GetCountries([FromQuery] Params cityParams)
        {
            return await _cityRepository.GetCountriesAsync();
        }
     }
}