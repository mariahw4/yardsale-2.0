// const { Model, DataTypes } = require('sequelize');


// class Comment extends Model { }

// Comment.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         comment_content: {
//             type: DataTypes.STRING,
//             validate: {
//                 len: [5]
//             }
//         },
//         date_created: {
//             type: DataTypes.DATE,
//             allowNull: false,
//             defaultValue: DataTypes.NOW
//         },
//         user_id: {
//             type: DataTypes.INTEGER,
//             references: {
//                 model: 'user',
//                 key: 'id'
//             },
//         },
//         listing_id: {
//             type: DataTypes.INTEGER,
//             references: {
//                 model: 'listing',
//                 key: 'id'
//             },
//         },
//     },
//     {
//         sequelize,
//         timestamps: false,
//         freezeTableName: true,
//         underscored: true,
//         modelName: 'comment',
//     }
// );

// module.exports = Comment;
