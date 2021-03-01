import React, { useContext } from 'react';
import {useQuery} from '@apollo/client';
import {Grid} from 'semantic-ui-react';

import PostCard from '../Components/PostCard';
import {AuthContext} from '../Context/auth';
import PostForm from '../Components/PostForm';
import {FETCH_POSTS_QUERY} from '../Util/graphql';

//Todo! Check the posts at the backend, they are missing data
function Home() {
    const {user} = useContext(AuthContext);
    const {loading, data} = useQuery(FETCH_POSTS_QUERY);

    return (
        <Grid columns={3} divided>
            <Grid.Row className = 'recent-posts'>
                <h1> Recent Posts</h1>
            </Grid.Row>
        <Grid.Row>
            {user && (
                <Grid.Column>
                    <PostForm/>
                </Grid.Column>
            )}

            {loading ? 
                (
                    <h1> Loading..</h1>
                ) 
            : 
                (
                    data && data.getPosts.map(post => (
                        <Grid.Column key = {post.id} style = {{marginBottom: 20}}>
                            <PostCard post = {post}/>
                        </Grid.Column>
                    ))
                    )
            }
        </Grid.Row>
        </Grid>
    )
};

export default Home;