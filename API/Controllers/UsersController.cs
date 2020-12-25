using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetUsersDtoAsync();

            return Ok(_mapper.Map<IEnumerable<MemberDto>>(users));

        }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUSer(string username)
        {
            var user = await _userRepository.GetUserDtoAsync(username);

            return _mapper.Map<MemberDto>(user);
           
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser (UserUpdateDto userUpdateDto) 
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            _mapper.Map(userUpdateDto, user);

            _userRepository.Update(user);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update user");
        }
    }
}