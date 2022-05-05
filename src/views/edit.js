import { editById, getAllCategories, getById } from '../api/data.js';
import {html} from '../lib.js';

const editTemplate = (game, onSubmit, categories) => html `
<section id="edit-page" class="auth">
    <form @submit=${onSubmit} id="edit">
        <div class="container">

            <h1>Edit Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" value="${game.title}">

            <label for="category">Category:</label>
            <select name="category" id="category" selected="${game.category.name}">
                ${categories.map(category => optionTemplate(category, game.category.name))}
            </select>

            <label for="game-img">Image:</label>
            <input type="text" id="image" name="image" value="${game.image}">

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary">${game.summary}</textarea>
            <input class="btn submit" type="submit" value="Edit Game">

        </div>
    </form>
</section>
`

const optionTemplate = (category, selected) => html `
${selected == category.name ? html`<option name="${category.id}" value="${category.name}" selected="selected">${category.name}</option>`: html `<option name="${category.id}" value="${category.name}">${category.name}</option>`}

`

export async function editPage(ctx) {
    const game = await getById(ctx.params.id);
    let categories = await getAllCategories();
    ctx.render(editTemplate(game, onSubmit, categories))


    async function onSubmit(ev) {

        ev.preventDefault()

        const formData = new FormData(ev.target);
        const title = formData.get('title').trim();
        const category_obj = document.querySelector('#category')
        const image = formData.get('image').trim();
        const summary = formData.get('summary').trim();

        const category= category_obj.selectedOptions[0].attributes.name.value


        if (title === '' || image === '' || summary === '') {
            return alert('All fields are required')
        };

        await editById(ctx.params.id, {
            title,
            category,
            image,
            summary
        })

        ev.target.reset();
        ctx.page.redirect(`/details/${ctx.params.id}`);
    }
}