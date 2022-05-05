import { getAllGames } from '../api/data.js';
import {html} from '../lib.js';



const catalogTemplate = (games) => html`
 <section id="catalog-page">
    <h1>All Games</h1>
    ${games.length == 0 ? html `<h3 class="no-articles">No games yet</h3>` : games.map(gameCard)}
</section>
`

const gameCard = (game) => html `
<div class="allGames">
        <div class="allGames-info">
            <img src=${game.image}>
            <h6>${game.category.name}</h6>
            <h2>${game.title}</h2>
            <a href="/details/${game.id}" class="details-button">Details</a>
        </div>
    </div>
`

export async function catalogPage(ctx) {
    const games = await getAllGames()
    ctx.render(catalogTemplate(games)) 
}



