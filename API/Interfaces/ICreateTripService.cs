using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Interfaces
{
    public interface ICreateTripService
    {
         Task<ICollection<AttractionDto>> ChooseAttractions(CreateTripDto createTripDto);
    }
}