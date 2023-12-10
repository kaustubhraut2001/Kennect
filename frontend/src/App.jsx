import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [username, setUsername] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const[posttitle , setPostTitle] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const [getallpost , setAllposts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {

      try {
        const response = await axios.get('/api/user');
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      setIsLoading(true);
      searchPosts();
    } else {
      setIsLoading(false);
      setSearchResults([]);
      setNoResults(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchPosts();
  }, []);



  const fetchallpost = async () => {
    try {
      const response = await axios.get('http://localhost:3000/posts/posts');
      setAllposts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }

  };

  useEffect(() => {
    fetchallpost();

   },[]);




  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);

    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleAddPost = async () => {
    try {
      await axios.post('http://localhost:3000/posts/add/posts', {
        author: username,
        title : posttitle,
        content: userMessage,
      });



     window.alert("Post added successfully. Do you want to add another post?");

      setUserMessage('');
      setUsername('');
      setPostTitle('');
      setSearchTerm('');
      fetchallpost();

      // Clear the user message field after adding the post
    } catch (error) {
      console.error('Error adding post:', error.message);
    }
  };

  const handleAddComment = async (postid, commentText) => {
    try {
      await axios.post(`http://localhost:3000/posts/comment/${postid}/comments/${username}`, {
        user: username,
        message: commentText,
      });

    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  };

  const searchPosts = async () => {
    try {

      const response =  getallpost.filter((post) => {
        return (
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.comments.some((comment) =>
            comment.message.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );




      });

      setSearchResults(response);
      setIsLoading(false);
      if (response.length === 0) {
        setNoResults(true);
      }
      else{
        setNoResults(false);

      }

    } catch (error) {
      console.error('Error searching posts:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Posts Feed</h1>
      {/* Input fields for username, post title, and message */}
      <label htmlFor="username" className="block mb-2">
        Enter your name:
      </label>
      <input
        type="text"
        id="username"
        placeholder="Your Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
      />

      <label htmlFor="postTitle" className="block mb-2">
        Enter your post title:
      </label>
      <input
        type="text"
        id="postTitle"
        placeholder="Post Title"
        value={posttitle}
        onChange={(e) => setPostTitle(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
      />

      <label htmlFor="userMessage" className="block mb-2">
        Write your message:
      </label>
      <textarea
        id="userMessage"
        placeholder="Enter your message here"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full h-32"
      ></textarea>

      {/* Button to add a post */}
      <button onClick={handleAddPost} className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Post
      </button>

      {/* Loading indicator */}
      {isLoading && <div className="mt-6 text-gray-600">Searching...</div>}

      {/* Search input */}
      <input
        type="text"
        placeholder="Search Posts title & Comments"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
      />

      {/* No search results message */}
      {noResults && <p className="mt-4 text-red-500">No search results found.</p>}

      {/* Posts and comments display */}
      <div id="postsContainer">
        {searchResults.length > 0 ? (
          searchResults.map((post) => (
            <div key={post.id} className="border border-gray-300 p-4 mb-4">

              <h2 className="text-lg font-bold mb-2">{post.title}</h2>
              <p className="text-gray-800">{post.content}</p>

              <p className="text-gray-600 text-sm mt-2">- Posted by {post.author}</p>

                {/* Comment form */}
                <form onSubmit={(e) =>
                {e.preventDefault();
                handleAddComment(post.id, e.target.comment.value);
                e.target.comment.value = '';
                }
                }>
                <label htmlFor="comment" className="block mb-2 mt-4">
                  Add a comment:
                </label>
                <input
                  type="text"
                  id="comment"
                  placeholder="Your comment"
                  className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Add Comment
                </button>

              </form>

            </div>
          ))
        ) : getallpost.length > 0 ? (
          getallpost.map((post) => (
            <div key={post.id} className="border border-gray-300 p-4 mb-4">
              {/* Post content */}
              {/* ... (existing post content) */}
              <h2 className="text-lg font-bold mb-2">{post.title}</h2>
              <p className="text-gray-800">{post.content}</p>
              <p className="text-gray-600 text-sm mt-2">- Posted by {post.author}</p>


               <p  className="text-gray-600 text-sm mt-2">Comments: <br/
              >{
                  post.comments.map((comment) => (
                    <div key={comment.id}>
                      <p>{comment.user}: {comment.message}</p>
                    </div>
                  ))

                }</p>


              {/* Comment form */}
              <form onSubmit={(e) =>
                {e.preventDefault();
                handleAddComment(post.id, e.target.comment.value);
                e.target.comment.value = '';
                }}>
                <label htmlFor="comment" className="block mb-2 mt-4">
                  Add a comment:
                </label>
                <input
                  type="text"
                  id="comment"
                  placeholder="Your comment"
                  className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Add Comment
                </button>

              </form>



              {post.comments.length > 0 ? (
              <ul className="mt-4">
                {post.comments.map((comment, index) => (
                  <li key={index} className="mb-2">
                    <strong>{comment.user}:</strong> {comment.message}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4">No comments yet.</p>
            )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No posts available. Start by creating one!</p>
        )}
      </div>
    </div>
  );
};

export default App;