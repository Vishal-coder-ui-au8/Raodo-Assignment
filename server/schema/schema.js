const graphql = require("graphql")
const Word = require("../models/Word")
const getWordDetail = require("../utils/util")

// to create a word collection in MongoDB and make queries to it using GraphQL and mongoose.
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
} = graphql

//created a GraphQL type
const WordType = new GraphQLObjectType({
    name: 'Word',
    fields: () => ({
        id: { type: GraphQLID },
        word: { type: GraphQLString },
        entries: {
            type: new GraphQLList(new GraphQLObjectType({
                name: 'Entry',
                fields: () => ({
                    partOfSpeech: { type: GraphQLString },
                    origin: { type: new GraphQLList(GraphQLString) },
                    definitions: { type: new GraphQLList(GraphQLString) },
                    examples: { type: new GraphQLList(GraphQLString) }
                })
            }))
        }
    })
})

//We defined a query for word inside the RootQuery object
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        word: {
            type: WordType,
            args: { id:{ type: GraphQLID} },
            resolve(parent, args) {
                return Word.findById(args)
            }
        },
        words: {
            //type is an instance of GraphQLList,tells GraphQL that it is a list of the shape of WordType,which we previously defined
            type: new GraphQLList(WordType),
            //resolve function: if we query for words, the resolve function should return a list of words that match the WordType shape
            resolve(parent, args) {
                return Word.find()
            }
        }
    }
})

//created a new GraphQLObjectType for our mutation type; we set the args as the fields we want to save and the resolve function will
//handle the saving.i.e,,to update that list
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addWord: {
            type: WordType,
            args: {
                word: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                let wordDetail = await getWordDetail(args.word)
                if (!wordDetail) return false
                let word = new Word(wordDetail)
                return word.save()
            }
        }
    }
})

//export an instance of the GraphQLSchema with query, mutation
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})