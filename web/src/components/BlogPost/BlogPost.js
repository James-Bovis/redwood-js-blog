import { Link, routes } from '@redwoodjs/router'

const BlogPost = ({ post }) => {
  return (
    <article>
      <header>
        <h1>
          <Link to={routes.blogPost({ id: post.id })}>{post.title}</Link>
        </h1>
      </header>
      <p>{post.body}</p>
      <small>
        { `Created at: ${new Date(post.createdAt).toLocaleString()} `}
      </small>
    </article>
  )
}

export default BlogPost
