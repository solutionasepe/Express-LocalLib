const express = require('express');
const router = express.Router();

const book_controller = require("../controllers/bookController");
const author_controller = require("../controllers/authorController");
const bookInstance_controller = require("../controllers/bookInstanceController");
const genre_controller = require("../controllers/genreController");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// book routers
router.get('/', book_controller.index);

router.get('/book/create', book_controller.book_create_get);

router.post('/book/create', book_controller.book_create_post);

router.get('/book/:id/delete', book_controller.book_delete_get);

router.post('/book/:id/delete', book_controller.book_delete_post);

router.get('/book/:id/update', book_controller.book_update_get);

router.post('/book/:id/update', book_controller.book_update_post);

router.get('/books/:id', book_controller.book_details);

router.get('/books', book_controller.book_list);
//author routers

router.get('/author/create', author_controller.author_create_get);

router.post('/author/create', author_controller.author_create_post);

router.get('/author/:id/delete', author_controller.author_delete_get);

router.post('/author/:id/delete', author_controller.author_delete_post);

router.get('/author/:id/update', author_controller.author_update_get);

router.post('/author/:id/update', author_controller.author_update_post);

router.get('/authors/:id', author_controller.author_detail);

router.get("/authors", author_controller.author_list);

//bookInstance routers

router.get('/bookInstance/create', bookInstance_controller.bookinstance_create_get);

router.post('/bookInstance/create', bookInstance_controller.bookinstance_create_post);

router.get('/bookInstance/:id/delete', bookInstance_controller.bookinstance_delete_get);

router.post('/bookInstance/:id/delete', bookInstance_controller.bookinstance_delete_post);

router.get('/bookInstance/:id/update', bookInstance_controller.bookinstance_update_get);

router.post('/bookInstance/:id/update', bookInstance_controller.bookinstance_update_post);

router.get('/bookinstances/:id', bookInstance_controller.bookinstance_detail);

//genre routers

router.get('/genre/create', genre_controller.genre_create_get);

router.post('/genre/create', genre_controller.genre_create_post);

router.get('/genre/:id/delete', genre_controller.genre_delete_get);

router.post('/genre/:id/delete', genre_controller.genre_delete_post);

router.get('/genre/:id/update', genre_controller.genre_update_get);

router.post('/genre/:id/update', genre_controller.genre_update_post);

router.get('/genres/:id', genre_controller.genre_details);

router.get('/genres', genre_controller.genre_list);

module.exports = router;