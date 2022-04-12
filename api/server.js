// BUILD YOUR SERVER HERE

const express = require('express');
const server = express();
server.use(express.json());
const User = require('./users/model');

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'The user with the specified ID does not exist' });
            } else {
                res.json(user);
            }
        })
});

server.post('/api/users', (req, res) => {
    if (!req.body.name || !req.body.bio) {
        res.status(400).json({ message: 'Please provide name and bio for the user' });
    } else {
        User.insert(req.body)
            .then(user => res.status(201).json(user))
            .catch(err => res.status(500).json(err));
    }
});

server.delete('/api/users/:id', (req, res) => {
    User.remove(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'The user with the specified ID does not exist' });
            } else {
                res.json(user);
            }
        })
        .catch(err => res.status(500).json(err));
});

server.put('/api/users/:id', (req, res) => {
    if (!req.body.name || !req.body.bio) {
        res.status(400).json({ message: 'Please provide name and bio for the user' });
    } else {
        User.findById(req.params.id)
            .then(user => {
                if (!user) {
                    res.status(404).json({ message: 'The user with the specified ID does not exist' });
                } else {
                    User.update(req.params.id, req.body)
                        .then(user => res.json(user))
                        .catch(err => res.json(err));
                }
            }
        )
    }
});


// EXPORT YOUR SERVER

module.exports = server;
