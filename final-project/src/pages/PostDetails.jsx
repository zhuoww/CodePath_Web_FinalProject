import React, { useState, useEffect } from "react";
import { supabase } from "../client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./PostDetails.css";
import { BiLike, BiSolidEdit, BiTrash } from "react-icons/bi";
import { PiTrashSimpleBold } from "react-icons/pi";
import { FiEdit3 } from "react-icons/fi";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [count, setCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select()
        .eq("id", id)
        .single();
      if (error) {
        console.error("Error fetching post", error);
      } else {
        setPost(data);
        setCount(data.upvotes);
      }
    };
    fetchPost();

    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select()
        .eq("post_id", id);
      if (error) {
        console.error("Error fetching comments", error);
      } else {
        setComments(data);
      }
    };
    fetchComments();
  }, [id, comments, count, newComment]);

  const upvotePost = async () => {
    const { data, error } = await supabase
      .from("posts")
      .update({ upvotes: count + 1 })
      .eq("id", id);
    if (error) {
      console.error("Error upvoting post", error);
    } else {
      setCount(count + 1);
    }
  };

  const submitComment = async () => {
    const { data, error } = await supabase.from("comments").insert({
      post_id: id,
      content: newComment,
    });
    setNewComment("");
    if (error) {
      console.error("Error submitting comment", error);
    } else if (data) {
      setComments([...comments, data[0]]);
    }
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setEditedComment(comment.content);
  };

  const handleUpdateComment = async (commentId) => {
    const { data, error } = await supabase
      .from("comments")
      .update({ content: editedComment })
      .eq("id", commentId);

    if (error) {
      console.error("Error updating comment", error);
    } else {
      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: editedComment }
            : comment
        )
      );
      setEditingComment(null);
      setEditedComment("");
    }
  };

  const handleDeleteComment = async (commentId) => {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (error) {
      console.error("Error deleting comment", error);
    } else {
      setComments(comments.filter((comment) => comment.id !== commentId));
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  const postDate = new Date(post.created_at);
  const now = new Date();
  const diffInSeconds = Math.floor((now - postDate) / 1000);
  let timeAgo;

  if (diffInSeconds < 60) {
    timeAgo = "just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    timeAgo = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    timeAgo = `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    timeAgo = `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 2629800) {
    const weeks = Math.floor(diffInSeconds / 604800);
    timeAgo = `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 31557600) {
    const months = Math.floor(diffInSeconds / 2629800);
    timeAgo = `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(diffInSeconds / 31557600);
    timeAgo = `${years} year${years > 1 ? "s" : ""} ago`;
  }

  return (
    <div className="details">
      <p className="posted-time">Posted {timeAgo}</p>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <img className="details-img" src={post.image} alt="" />
      <div className="details-upvotes">
        <button
          onClick={upvotePost}
          style={{ border: "none", background: "transparent", padding: 0 }}
        >
          <BiLike className="upvotes-icon" />
        </button>
        <p className="upvotes-text">{count} Upvotes</p>
      </div>
      <div className="details-comments">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            {editingComment?.id === comment.id ? (
              <>
                <textarea
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                />
                <div className="comment-update-buttons">
                  <button
                    className="comment-update-button"
                    onClick={() => handleUpdateComment(comment.id)}
                  >
                    Update
                  </button>
                  <button
                    className="comment-update-button"
                    onClick={() => setEditingComment(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="comment-content">
                <p>- {comment.content}</p>
                <div className="comment-actions">
                  <FiEdit3
                    className="comment-icon"
                    onClick={() => handleEditComment(comment)}
                  />
                  <PiTrashSimpleBold
                    className="comment-icon"
                    onClick={() => handleDeleteComment(comment.id)}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        <div className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Leave a comment..."
          />
          <button className="details-submit-button" onClick={submitComment}>
            Submit
          </button>
        </div>
      </div>
      <Link to={`/edit/${post.id}`}>
        <button className="details-edit-button">Wanna edit this Post?</button>
      </Link>
    </div>
  );
};

export default PostDetails;
