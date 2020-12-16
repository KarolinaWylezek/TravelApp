using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class CityRepository : ICityRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CityRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<City>> GetCitiesAsync()
        {
            return await _context.Cities.Include(e => e.Events).Include(p => p.Places).ToListAsync();
        }

        public async Task<IEnumerable<CityDto>> GetCitiesDtoAsync()
        {
            return await _context.Cities.ProjectTo<CityDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<City> GetCityByIdAsync(int id)
        {
            return await _context.Cities.FindAsync(id);
        }

        public async Task<City> GetCityByNameAsync(string name)
        {
            return await _context.Cities.Include(e => e.Events).Include(p => p.Places).FirstOrDefaultAsync(x => x.Name == name);
        }

        public async Task<CityDto> GetCityDtoAsync(string name)
        {
            return await _context.Cities.Where(x => x.Name == name).ProjectTo<CityDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(City city)
        {
            _context.Entry(city).State = EntityState.Modified;
        }
    }
}