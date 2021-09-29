require('dotenv').config();
require('./utils/verifyConfiguration')();
const express = require('express');
const path = require('path');
const routes = require('./controllers');
const PORT = process.env.PORT || 3001;
const db = require('./models');
const morgan = require('morgan');
const compression = require('compression');
const app = express();

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use(routes);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

db.sequelize.sync({force:false}).then(function () {
    if (process.env.NODE_ENV === 'test') {
        db.User.create({ email: 'test@test.com', password: 'password' }).then(
            () => {
                console.log("Tester l'utilisateur créé ");
            }
        );
    }
    app.listen(PORT, function () {
        console.log(`Serveur maintenant sur le port ${PORT}!`);
    });
});
