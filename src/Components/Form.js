import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";

const Form = () => {
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState({
      userId: uuid(),
      title: "",
      body: ""
    });
    const [toast, setToast] = useState(false);
  
    useEffect(() => {
      axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
        setPosts(res.data);
      });
    }, []);
  
    const clickHandler = async () => {
      try {
        await axios
          .post(`https://jsonplaceholder.typicode.com/posts`, post)
          .then((res) => {
            setPosts([...posts, res.data]);
          });
        setPost({ ...post, title: "", body: "" });
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 4000);
      } catch (e) {
        console.log(e);
      }
    };
    return (
      <div>
        <h1 className="centered">Exercise 2 : </h1>
        <h2 className="heading">
          Taking input from the user and adding a new post to the database.
        </h2>
        <form
          className="page-wrapper flex-page"
          onSubmit={(e) => {
            e.preventDefault();
            clickHandler();
          }}
        >
          <h1 className="page-heading centered">Form</h1>
          <div className="input-labels">Title</div>
          <input
            className="input-field"
            type="text"
            placeholder="Enter post Title here"
            value={post.title}
            onChange={(e) => {
              setPost({ ...post, title: e.target.value });
            }}
          />
          <div className="input-labels">Body</div>
          <input
            className="input-field"
            type="text"
            placeholder="Enter post body here"
            value={post.body}
            onChange={(e) => setPost({ ...post, body: e.target.value })}
            required
          />
          <button className="add-post-button" type="submit">
            Add post
          </button>
          <div className="user">
            Total Number of posts to show post was successfully added :{" "}
            <span className="post-length">{posts.length}</span>{" "}
          </div>
        </form>
        {toast && <p className="toast">Post Added Successfully ✅</p>}
      </div>
    );
  };

  export {Form}