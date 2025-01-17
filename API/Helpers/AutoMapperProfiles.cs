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
            CreateMap<RegisterDto, AppUser>();
            CreateMap<UserUpdateDto, AppUser>();
            CreateMap<AppUser, MemberDto>();
            CreateMap<Trip, TripDto>();
            CreateMap<Trip, UserTripDto>();
            CreateMap<Attraction, AttractionDto>();
            CreateMap<AttractionDto, Attraction>();
            CreateMap<EventEditDto, Event>();
            CreateMap<PlaceEditDto, Place>();
            CreateMap<Category, CategoryDto>();
            CreateMap<EventDto, AttractionDto>().ForMember(x => x.Id, opt => opt.Ignore());
            CreateMap<PlaceDto, AttractionDto>().ForMember(x => x.Id, opt => opt.Ignore());
          
        }
    }
}