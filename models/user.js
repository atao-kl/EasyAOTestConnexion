
const bcrypt = require('bcryptjs');
module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define(
        'User',
        {

            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            defaultScope: {
                attributes: { exclude: ['password'] }
            },
            scopes: {
                withPassword: {
                    attributes: {}
                }
            }
        }
    );

    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    User.addHook('beforeCreate', function (user) {
        user.password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(10),
            null
        );
    });

    User.associate = function (models) {
        User.hasMany(models.Note, {
            onDelete: 'cascade'
        });
    };

    return User;
};
