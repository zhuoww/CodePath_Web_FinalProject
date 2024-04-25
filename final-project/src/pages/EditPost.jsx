import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../client";
import { useParams } from "react-router-dom";
import "./EditPost.css";

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ title: "", description: "", image: "" });

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching post", error);
      } else {
        setPost(data);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const updatePost = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("posts")
      .update({
        title: post.title,
        description: post.description,
        image: post.image,
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating post", error);
    } else {
      alert("Post updated successfully!");
    }
  };

  const deletePost = async (e) => {
    e.preventDefault();

    // First, delete the comments associated with the post
    const { data: comments, error: commentsError } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", id);

    if (comments && comments.length > 0) {
      for (const comment of comments) {
        const { error: deleteError } = await supabase
          .from("comments")
          .delete()
          .eq("id", comment.id);

        if (deleteError) {
          console.error("Error deleting comment", deleteError);
        }
      }
    }

    // Then, delete the post
    const { data, error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      console.error("Error deleting post", error);
    } else {
      alert("Post deleted successfully!");
    }
  };

  return (
    <div className="edit">
      <h1>Update Your Post</h1>
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
        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          id="image"
          name="image"
          value={post.image}
          onChange={handleChange}
        />
        <div className="edit-buttons">
          <button
            className="edit-submit-button"
            type="submit"
            onClick={updatePost}
          >
            Update Post
          </button>
          <button className="edit-submit-button" onClick={deletePost}>
            Delete Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
