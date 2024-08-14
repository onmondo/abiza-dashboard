import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { doLoadPosts } from "./actions"

export default function Posts() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(doLoadPosts())
    }, [])

    const state = useSelector((state) => {
        return state.earnings;
    });

    const { posts } = state
    return (
        <section className="dashboardbox">
            <header>
                <h1>Posts</h1>
            </header>
            {(posts) 
            ? 
            <ol>
            {posts.map((post, i) => 
                <li key={i}>
                    <article>
                        <header>
                            <h1>{post.title}</h1>
                        </header>
                        <p>
                            {post.body}
                        </p>
                    </article>
                </li>
            )}
            </ol>
            : <i>No posts</i>
            }
            {/* <button className="main" onClick={handleLoadPosts}>Load posts</button> */}

        </section>

    )
}