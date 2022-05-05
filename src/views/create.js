import { create, getAllCategories } from '../api/data.js';
import {html} from '../lib.js';

const createTemplate = (onSubmit, categories) => html`
<section id="create-page" class="auth">
    <form @submit=${onSubmit} id="create">
        <div class="container">

            <h1>Create Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" placeholder="Enter game title...">

            <label for="category">Category:</label>
            <select name="category" id="category">
                ${categories.map(category => html `<option name="${category.id}" value="${category.name}">${category.name}</option>`)}
            </select>

            <label for="game-img">Image:</label>
            <input type="text" id="image" name="image" placeholder="Upload a photo...">

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary"></textarea>
            <input class="btn submit" type="submit" value="Create Game">
        </div>
    </form>
</section>
`

export async function createPage(ctx) {
    let categories = await getAllCategories()
    ctx.render(createTemplate(onSubmit, categories));

    async function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        const title = formData.get('title').trim();
        const category_obj = document.querySelector('#category')
        const image = formData.get('image').trim();
        const summary = formData.get('summary').trim();

        const category= category_obj.selectedOptions[0].attributes.name.value


        if (title === '' || image === '' || summary === '') {
            return alert('All fields are required')
        };

        await create({
            title,
            category,
            image,
            summary
        })

        ev.target.reset();

        ctx.page.redirect('/');
    }
}