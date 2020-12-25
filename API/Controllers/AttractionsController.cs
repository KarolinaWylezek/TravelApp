using System.Collections.Generic;
using System.Threading.Tasks;
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
        public AttractionsController(ITripsRepository tripsRepository, IMapper mapper)
        {
            _mapper = mapper;
            _tripsRepository = tripsRepository;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<AttractionDto>>> GetAttractions(int id)
        {
            var attractions = await _tripsRepository.GetAttractions(id);
            return Ok(attractions);
        }

    }
}

