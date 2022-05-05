import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;



export async function getById(id) {
    return api.get(`/games/${id}/`)
}


export async function create(data) {
    return api.post('/games/', data)
}

export async function editById(id, data) {
    return api.put(`/games/${id}/`, data)
}

export async function deleteById(id) {
    return api.del(`/games/${id}/`)
}

export async function getAllGames() {
    return api.get('/games/')
}

export async function getAllCategories() {
    return api.get('/game_category/')
}


export async function getAllComments(gameId) {
    return api.get(`/data/comments?where=gameId%3D%22${gameId}%22`)
}

export async function postComment(gameId, comment) {
    return api.post('/data/comments', {
        gameId,
        comment
    })
}