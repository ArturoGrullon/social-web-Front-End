import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import {gql, useMutation} from '@apollo/client';
import {useForm} from '../Util/hooks';
import {FETCH_POSTS_QUERY} from '../Util/graphql';


function PostForm(params) {
    const {values, onChange, onSubmit} = useForm(createPostCallback, {
        body: ''
    });

    const [createPost, {error}] = useMutation(POST_MUTATION, {
        variables: values,
        update(proxy, result){
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            //Todo: Read apollo documentation
            const newData = [...result.data.createPost, ...data.getPosts];
            //data.getPosts = [result.data.createPost, ...data.getPosts];
            proxy.writeQuery({ query: FETCH_POSTS_QUERY, newData});
            values.body = '';
        },onError(err) {
            console.log(err);
        }
    });

    function createPostCallback(){
        createPost();
    }

    return (
        <Form onSubmit ={onSubmit}>
            <h2>Create post</h2>
            <Form.Field>
                <Form.Input
                    placeholder = "hi"
                    name = "body"
                    onChange = {onChange}
                    value = {values.body}
                />
                <Button type= "submit" color="olive">
                    Submit
                </Button>
            </Form.Field>
        </Form>
    );
    
}

const POST_MUTATION = gql`
    mutation createPost($body: String!){
        createPost(body: $body){
            id body createdAt username
            likes{
                id username createdAt
            }
            #likeCount
            comments{
                id body username createdAt
            }
            #commentCount
        }
    }
`;

export default PostForm;