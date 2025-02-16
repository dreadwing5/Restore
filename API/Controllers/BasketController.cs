using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController(StoreContext context) : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NoContent();

            return basket.ToDto(); //Why not use AutoMapper?
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {

            var basket = await RetrieveBasket();

            basket ??= CreateBasket();
            // basket ??= CreateBasket(); // if basket is null, create a new basket else use the existing basket

            var product = await context.Products.FindAsync(productId);

            if (product == null) return BadRequest("Problem adding item to basket");

            basket.AddItem(product, quantity);

            var result = await context.SaveChangesAsync() > 0;
            System.Console.WriteLine("I am, stupid");

            if (result) return CreatedAtAction(nameof(GetBasket), basket.ToDto()); // returns the location header

            return BadRequest("Problem adding item to basket");
        }


        private Basket CreateBasket()
        {
            var basketId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.UtcNow.AddDays(30) };
            Response.Cookies.Append("basketId", basketId, cookieOptions);
            var basket = new Basket { BasketId = basketId };
            context.Baskets.Add(basket);
            return basket;
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            var basket = await RetrieveBasket();

            // get basket

            if (basket == null) return BadRequest("Unable to reterive basket");

            basket.RemoveItem(productId, quantity);

            var result = await context.SaveChangesAsync() > 0;
            // remove item from basket or reduce quantity

            // save basket

            if (result) return Ok();

            return BadRequest("Problem removing item from basket");
        }

        private async Task<Basket?> RetrieveBasket()
        {
            return await context.Baskets.Include(x => x.Items).ThenInclude(x => x.Product).FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["basketId"]);
        }


    }
}