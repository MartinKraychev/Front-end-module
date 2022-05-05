import { deleteById, getAllComments, getById, postComment } from '../api/data.js';
import {html} from '../lib.js';
import { getUserData } from '../util.js';


const detailsTemplate = (game, userId, comments, canComment, onSubmit, onDelete) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${game.image} />
            <h1>${game.title}</h1>
            <p class="type">${game.category.name}</p>
        </div>

        <p class="text">
            ${game.summary}
        </p>
         <!-- Bonus ( for Guests and Users ) comments -->
         <div class="details-comments">
            <h2>Comments:</h2>
            <ul>
                ${comments.length == 0 ? html `<p class="no-comment">No comments.</p>` : comments.map(commentTemplate)} 
            </ul>
        </div>

        <!-- Buttons depending on user is owner or not -->
        ${game.user == userId ? html `<div class="buttons">
            <a href="/edit/${game.id}" class="button">Edit</a>
            <a @click =${onDelete} href="javascript: void(0)" class="button">Delete</a>
        </div>` : null}

        <!-- comment form depeding on owner and logged in user -->
        ${canComment ? canCommentTemplate(onSubmit) : null}    

</section>    
`

const commentTemplate = (comment) => html `
<li class="comment">
    <p>Content: ${comment.comment}.</p>
</li>
`

const canCommentTemplate = (onSubmit) => html `
<article class="create-comment">
    <label>Add new comment:</label>
    <form @submit =${onSubmit} class="form">
        <textarea name="comment" placeholder="Comment......"></textarea>
        <input class="btn submit" type="submit" value="Add Comment">
    </form>
</article>
`

export async function detailsPage(ctx) {
    const userData = getUserData();
    const game = await getById(ctx.params.id);
    // const comments = await getAllComments(ctx.params.id);
    
    

    let userId = undefined
    if(userData) {
        userId = userData.id
    } ;

    const comments = []

    const canComment = userData && game.user != userData.id;

    ctx.render(detailsTemplate(game, userId, comments, canComment, onSubmit, onDelete))


    async function onDelete() {
        await deleteById(ctx.params.id)
        ctx.page.redirect('/')
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        const comment = ev.target.querySelector('textarea').value
        if (comment == '') {
            return alert('Please leave a comment')
        }
        postComment(ctx.params.id, comment)
        ev.target.reset()
        ctx.page.redirect(`/details/${ctx.params.id}`)
    }

}