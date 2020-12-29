using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AttractionsController : BaseApiController
    {
        private readonly ITripsRepository _tripsRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public AttractionsController(ITripsRepository tripsRepository, IMapper mapper, DataContext context)
        {
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

        

    }
}

