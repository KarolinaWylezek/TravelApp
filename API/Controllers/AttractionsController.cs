using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AttractionsController : BaseApiController
    {
        private readonly ITripsRepository _tripsRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly ICityRepository _cityRepository;
        public AttractionsController(ITripsRepository tripsRepository, IMapper mapper, DataContext context, ICityRepository cityRepository)
        {
            _cityRepository = cityRepository;
            _context = context;
            _mapper = mapper;
            _tripsRepository = tripsRepository;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<AttractionDto>>> GetAttractions(int id)
        {
            var attractions = await _tripsRepository.GetAttractions(id);
            return Ok(attractions);
        }

        [HttpGet("check/{attId}")]
        public async Task<ActionResult> CheckAttraction(int attId)
        {
            var attraction = await _tripsRepository.GetAttraction(attId);
            attraction.WasVisited = !attraction.WasVisited;

            if (await _cityRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Request failed");
        }

    }
}

