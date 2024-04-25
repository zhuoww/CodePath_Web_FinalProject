import React, { useState } from "react";
import { supabase } from "../client";
import "./CreatePost.css";

const CreatePost = () => {
  const [post, setPost] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createPost = async (e) => {
    e.preventDefault();

    // Insert the post into the database
    const { data, error } = await supabase
      .from("posts")
      .insert({
        title: post.title,
        description: post.description,
        image: post.imageUrl,
      })
      .select();

    if (error) {
      console.error("Error inserting data", error);
    } else {
      alert("Post created successfully!");
    }
  };

  return (
    <div className="create">
      <h1>Create Your Post</h1>
      <form action="">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={post.title}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          value={post.description}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={post.imageUrl}
          onChange={handleChange}
        />
        <button
          className="create-submit-button"
          type="submit"
          onClick={createPost}
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
