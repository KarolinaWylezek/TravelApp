using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<City, CityDto>();
            CreateMap<Event, EventDto>();
            CreateMap<Place, PlaceDto>();
            //CreateMap<AppUser, UserDto>();
            CreateMap<RegisterDto, AppUser>();
            CreateMap<UserUpdateDto, AppUser>();
            CreateMap<AppUser, MemberDto>();
            CreateMap<Trip, TripDto>();
        }
    }
}