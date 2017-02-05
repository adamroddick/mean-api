module.exports = function(app, db) {
    app.post('/notes', (req, res) => {
        const note = { title: req.body.title, content: req.body.content };

        db.collection('notes').insert(note, (err, result) => {
        if (err) {
            res.send({'error': 'An error has occured, please try again.'});
        } else {
            res.send(result.ops[0]);
                            console.log('Note created.');
        }
        });
    });

    var ObjectID = require('mongodb').ObjectID;

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };

        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occured'});
            } else {
                res.send(item);
                                console.log('Note ' + id + ' retrieved.');
            }
        });
    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };

        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occured'});
            } else {
                console.log('Note ' + id + ' deleted.');
                res.send("Deleted note " + id);
            };
        });
    });

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { title: req.body.title, content: req.body.content };

        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occured'});
            } else {
                console.log('Note ' + id + ' updated.');
                res.send("Updated note " + id);
            };
        });
    }
)};
