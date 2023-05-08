import React, { useState, useEffect } from "react";
import axios from "axios";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const tokenStr = localStorage.getItem("user");

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/blog/",
    headers: {
      Authorization: `Bearer ${tokenStr}`,
    },
  });

  useEffect(() => {
    axiosInstance
      .get("/posts/")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handlePostTitleChange(event) {
    setPostTitle(event.target.value);
  }

  function handlePostContentChange(event) {
    setPostContent(event.target.value);
  }

  function handlePostSubmit(event) {
    event.preventDefault();
    const payload = {
      title: postTitle,
      content: postContent,
      author: "author",
    };

    axiosInstance
      .post("/posts/", payload)
      .then((response) => {
        setPosts([...posts, response.data]);
        setPostTitle("");
        setPostContent("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleReviewContentChange(event, postId) {
    setReviewContent(event.target.value);
  }

  function handleReviewSubmit(event, postId) {
    event.preventDefault();
  
    // Add this console.log statement
    console.log("handleReviewSubmit called for postId:", postId);
  
    // Replace 'userName' with the actual user's name or the variable containing the user's name
    const payload = {
      content: reviewContent,
      user: "author",
      post: postId
    };
  
    axiosInstance
      .post(`/posts/${postId}/reviews/`, payload)
      .then((response) => {
        // Add this console.log statement
        console.log("handleReviewSubmit response:", response.data);
  
        setPosts(
          posts.map((post) => {
            if (post.id === postId) {
              const reviews = post.reviews || [];
              return { ...post, reviews: [...reviews, response.data] };
            } else {
              return post;
            }
          })
        );
        setReviewContent("");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  function handleLike(postId) {
    axiosInstance
      .post(`/posts/${postId}/like/`)
      .then((response) => {
        setPosts(
          posts.map((post) => {
            if (post.id === postId) {
              const likes = post.likes || [];
              return { ...post, likes: [...likes, response.data] };
            } else {
              return post;
            }
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <h2 className="text-xl font-bold mb-4">Posts</h2>
      {posts.map((post) => (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8" key={post.id}>
          <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
          <p className="text-gray-700 mb-2">{post.content}</p>
          <p className="text-gray-600 mb-4">
            By {post.author} on {new Date(post.created_at).toLocaleString()}
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mb-2"
            onClick={() => handleLike(post.id)}
          >
            Like ({post.likes && post.likes.length})
          </button>
          <form onSubmit={(event) => handleReviewSubmit(event, post.id)}>
            <input
              className="border border-gray-400 rounded-lg py-2 px-4 mb-2"
              type="text"
              value={reviewContent}
              onChange={(event) => handleReviewContentChange(event, post.id)}
              placeholder="Write a review..."
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
              type="submit"
            >
              Submit
            </button>
          </form>
          <ul className="mt-4">
            {post.reviews &&
              post.reviews.map((review) => (
                <li key={review.id} className="mb-2">
                  <p className="text-gray-700">{review.content}</p>
                  <p className="text-gray-600">
                    By {review.user} on{" "}
                    {new Date(review.created_at).toLocaleString()}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      ))}
      <h2 className="text-xl font-bold mb-4">Create a new post</h2>
      <form onSubmit={handlePostSubmit}>
        <input
          className="border border-gray-400 rounded-lg py-2 px-4 mb-2"
          type="text"
          value={postTitle}
          onChange={handlePostTitleChange}
          placeholder="Post title"
        />
        <br />
        <textarea
          className="border border-gray-400 rounded-lg py-2 px-4 mb-2"
          value={postContent}
          onChange={handlePostContentChange}
          placeholder="Post content"
        />
        <br />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          type="submit"
        >
          Create Post
        </button>
      </form>
    </div>
  );
  
}

export default Blog;
