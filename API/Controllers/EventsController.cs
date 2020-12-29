using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EventsController : BaseApiController
    {
        private readonly ICityRepository _cityRepository;
        private readonly DataContext _context;
        public EventsController(ICityRepository cityRepository, DataContext context)
        {
            _context = context;
            _cityRepository = cityRepository;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<EventDto>>> GetEvents(int id)
        {
            var events = await _cityRepository.GetEvents(id);
            return Ok(events);
        }

        //[Authorize(Policy = "ModerateCitiesRole")]
        [HttpPost("{cityId}/add-event")]
        public async Task<ActionResult<Event>> AddEvent(AddEventDto addEventDto, int cityId)
        {

           var newEvent = new Event
           {
               Name = addEventDto.Name,
               Address = addEventDto.Address,
               StartTime = addEventDto.StartTime,
               FinishTime = addEventDto.FinishTime,
               Theme = addEventDto.Theme,
               Subtheme = addEventDto.Subtheme,
               CityId = cityId

           };

           _context.Events.Add(newEvent);
           await _context.SaveChangesAsync();

           return newEvent;
        }

        [Authorize(Policy = "ModerateCitiesRole")]
        [HttpDelete("delete-event/{id}")]
        public async Task<ActionResult> DeleteEvent(int id)
        {
           _cityRepository.DeleteEvent(id);

           if(await _cityRepository.SaveAllAsync()) return NoContent();

           return BadRequest("Failed to delete event");
           
        }
    }
}