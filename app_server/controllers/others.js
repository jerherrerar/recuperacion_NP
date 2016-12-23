/* GET 'about us' page */
module.exports.about = function(req, res) {

    res.render('generic-text', {
        title: 'About BlogJerHer',
        content: 'BlogJerHer fue creado para permitir a las personas crear posts y leer posts. Proximamente podran compartir los y calificarlos'
    });
};