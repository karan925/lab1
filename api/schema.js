const graphql = require('graphql');
const userModel = require('./models/UserModel');
const bcrypt = require("bcrypt");
const { User } = require('./models/users');
const jwt = require('jsonwebtoken');
const { secret } = require('./config/config');




const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'registerUser',
    fields: () => ({
        _id: { type: GraphQLID },
        username: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        password: { type: GraphQLString },
        token: { type: GraphQLString },
    })
});

// const AuthorType = new GraphQLObjectType({
//     name: 'Author',
//     fields: () => ({
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         age: { type: GraphQLInt },
//         books: {
//             type: new GraphQLList(BookType),
//             resolve(parent, args) {
//                 return books.filter(book => book.authorId === parent.id);
//             }
//         }
//     })
// });

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Root Query',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve(parent) {
                // return users.find(user => user.id === args.id);
                return userModel.find().then(restaurant => {
                    console.log("Here");
                    console.log(restaurant);
                    return restaurant.map (r => ({ ...r._doc }))
                })
                .catch (err => {
                    console.error(err)
                })
            }
        },
        // login: {
        //     type: new GraphQLList(UserType),
        //     args: { username: { type: GraphQLString },  password: { type: GraphQLString } },
        //     async resolve(parent, args) {
        //         try {
        //             const restaurant = await userModel.find({ username: args.username });
        //             console.log("Here2");
        //             console.log(restaurant[0].password);
        //             console.log(args.password);

        //             const validPassword = await bcrypt.compare(
        //                 args.password,
        //                 restaurant[0].password);

        //             console.log(validPassword);
        //             if(validPassword){
        //                 // return restaurant.map(r => ({ ...r._doc }));
        //                 const payload = {_id: restaurant[0]._id, username: restaurant[0].username, firstName: restaurant[0].firstName, lastName: restaurant[0].lastName};
        //                 const token = jwt.sign(payload, secret, {
        //                 expiresIn: 1008000
        //             });
        //             return restaurant.map (r => ({ ...r._doc, token }))
        //             }
        //             else{
        //                 return null;
        //             }
        //         } catch (err) {
        //             console.error(err);
        //         }
        //     }
        // },
        // books: {
        //     type: new GraphQLList(BookType),
        //     resolve(parent, args) {
        //         return books;
        //     }
        // },
        // authors: {
        //     type: new GraphQLList(AuthorType),
        //     resolve(parent, args) {
        //         return authors;
        //     }
        // }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // addAuthor: {
        //     type: AuthorType,
        //     args: {
        //         name: { type: GraphQLString },
        //         age: { type: GraphQLInt },
        //         id: { type: GraphQLID }
        //     },
        //     resolve(parent, args) {
        //         let author = {
        //             name: args.name,
        //             age: args.age,
        //             id: args.id
        //         };
        //         authors.push(author)
        //         console.log("Authors", authors);
        //         return author;
        //     }
        // },

        addUser: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                password: { type:  GraphQLString },
                username: { type: GraphQLString },
            },
            async resolve(parent, args) {
                let user = {
                    firstName: args.firstName,
                    lastName: args.lastName,
                    password: args.password,
                    id: args.id
                }
                const { firstName, lastName, password, id, username } = args
                const userObj = new userModel({
                    firstName, lastName, password, username
                })
                userObj.id = userObj._id;
                const salt = await bcrypt.genSalt(10);
                const encPassword = await bcrypt.hash(userObj.password, salt);
                userObj.password = encPassword;
                return userObj.save()
                .then(result => {
                    return {...result._doc}
                })
                .catch (err => {
                    console.error(err)
                })
            }
        },
        login: {
            type: new GraphQLList(UserType),
            args: { username: { type: GraphQLString },  password: { type: GraphQLString } },
            async resolve(parent, args) {
                try {
                    const restaurant = await userModel.find({ username: args.username });
                    console.log("Here2");
                    console.log(restaurant[0].password);
                    console.log(args.password);

                    const validPassword = await bcrypt.compare(
                        args.password,
                        restaurant[0].password);

                    console.log(validPassword);
                    if(validPassword){
                        // return restaurant.map(r => ({ ...r._doc }));
                        const payload = {_id: restaurant[0]._id, username: restaurant[0].username, firstName: restaurant[0].firstName, lastName: restaurant[0].lastName};
                        const token = jwt.sign(payload, secret, {
                        expiresIn: 1008000
                    });
                    return restaurant.map (r => ({ ...r._doc, token }))
                    }
                    else{
                        return null;
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        },

    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

module.exports = schema;