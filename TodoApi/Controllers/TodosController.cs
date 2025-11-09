using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodosController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/todos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
        {
            return await _context.Todos.ToListAsync();
        }

        // POST: api/todos
        [HttpPost]
        public async Task<ActionResult<Todo>> CreateTodo([FromBody] Todo? todo)
        {
            if (todo == null)
                return BadRequest("Request body cannot be null.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTodos), new { id = todo.Id }, todo);
        }

        // PUT: api/todos/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, [FromBody] Todo? newTodo)
        {

            if (newTodo == null)
                return BadRequest("Request body cannot be null.");

            if (id != newTodo.Id)
                return BadRequest("ID in URL does not match ID in body.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var todo = await _context.Todos.FindAsync(id);
            if (todo == null)
                return NotFound($"Todo with ID {id} not found.");

            todo.Title = newTodo.Title;
            todo.Description = newTodo.Description;
            todo.IsCompleted = newTodo.IsCompleted;

            await _context.SaveChangesAsync();

            return NoContent(); 
        }

        // DELETE: api/todos/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            var todo = await _context.Todos.FindAsync(id);
            if (todo == null)
                return NotFound($"Todo with ID {id} not found.");

            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
