import BlogPost from 'src/components/BlogPost'
import { Link, routes } from '@redwoodjs/router'

export const QUERY = gql`
  query BlogPostsQuery {
    posts {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
  <p>
    Nothing here yet! <Link to={routes.newPost()}>Create a new Post</Link>
  </p>
)

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ posts }) => {
  return posts.map((post) => {
    return (
      <article key={post.id}>
        <h1>
          <Link to={routes.blogPost({ id: post.id })}>{post.title}</Link>
        </h1>
        <p>{ new Date(post.createdAt).toLocaleDateString() } </p>
      </article>
    )
  })
}
