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
    public class PlacesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly ICityRepository _cityRepository;
        private readonly DataContext _context;

        public PlacesController(IMapper mapper, ICityRepository cityRepository, DataContext context)
        {
            _context = context;
            _cityRepository = cityRepository;

            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<PlaceDto>>> GetPlace(int id)
        {
            var places = await _cityRepository.GetPlaces(id);
            return Ok(places);
        }

        [Authorize(Policy = "ModerateCitiesRole")]
        [HttpPost("{cityId}/add-place")]
        public async Task<ActionResult<Place>> AddPlace(AddPlaceDto addPlaceDto, int cityId)
        {

            var place = new Place
            {
                Name = addPlaceDto.Name,
                Address = addPlaceDto.Address,
                OpenTime = addPlaceDto.OpenTime,
                CloseTime = addPlaceDto.CloseTime,
                Theme = addPlaceDto.Theme,
                Subtheme = addPlaceDto.Subtheme,
                Promotion = true,
                ExpectedTimeSpent = addPlaceDto.ExpectedTimeSpent,
                CityId = cityId

            };

            _context.Places.Add(place);
            await _context.SaveChangesAsync();

            return place;
        }

        [HttpGet("place/{id}")]
        public async Task<ActionResult<PlaceDto>> GetSinglePlace(int id)
        {
            var place = await _cityRepository.GetPlaceByIdAsync(id);

            return _mapper.Map<PlaceDto>(place);
           
        }

        [Authorize(Policy = "ModerateCitiesRole")]
        [HttpDelete("delete-place/{id}")]
        public async Task<ActionResult> DeletePlace(int id)
        {
           _cityRepository.DeletePlace(id);

           if(await _cityRepository.SaveAllAsync()) return NoContent();

           return BadRequest("Failed to delete place");
           
        }

        [HttpPut("{placeId}")]
        public async Task<ActionResult> UpdatePlace(PlaceEditDto placeEditDto, int placeId)
        {
            var place = await _cityRepository.GetPlaceByIdAsync(placeId);

            _mapper.Map(placeEditDto, place);

           _cityRepository.UpdatePlace(place);

           if (await _cityRepository.SaveAllAsync()) return NoContent();

           return BadRequest("Failed to update");
        }
    }
}