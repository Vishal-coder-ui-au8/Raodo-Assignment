//Apollo Client is a state management library for JavaScript that enables you to manage both local and remote data with GraphQL. 
//Use it to fetch, cache, and modify application data, all while automatically updating your UI.
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const serverUrl = "http://localhost:5000/graphql"

//uri specifies the URL of our GraphQL server.
//cache is an instance of InMemoryCache, which Apollo Client uses to cache query results after fetching them.It will be fatser to 
//get data from the cache after fetching.
const client = new ApolloClient({
    uri: serverUrl,
    cache: new InMemoryCache()
})

//created a function that accepts a GraphQL query body and uses Fetch to retrieve the result from the API.
//
export const getAllWords = async () => {
    const result = await client
        .query({
            query: gql`
            {
                words{
                    word
                    entries{
                        partOfSpeech
                        origin
                        definitions
                        examples
                    }
                }
            }`
        })
    return result.data.words
}

//Mutations are a way to modify your remote and local data.
//mutations represent the state-changing methods similar to a PUT, POST, or DELETE request in REST
export const addNewWord = async (word) => {
    const result = await client
        .mutate({
            mutation: gql`
            mutation{
                addWord(word:"${word}"){
                    word
                    entries{
                        partOfSpeech
                        origin
                        definitions
                        examples
                    }
                }
            }`
        })
    if (result.data.addWord.word === null) return false
    console.log(result.data.addWord);
    return result.data.addWord
}