"use client";
import { Post } from '@/data/types';
import Card from '@/components/Card';
import { memo, useCallback, useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import Filter from '@/components/Filter';

interface PostsListProps {
  posts: Post[];
}

function PostsList({ posts }: PostsListProps) {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOpenModal = useCallback((id: number) => {
    setSelectedPostId(id);
  }, []);
  
  const handleCloseModal = useCallback(() => {
    setSelectedPostId(null);
    setErrorMessage(null);
  }, []);
  

  const retryFetch = useCallback(async (url: string, options: RequestInit, retries = 3): Promise<Response> => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error('Request failed');
      return response;
    } catch (error) {
      if (retries > 0) {
        return retryFetch(url, options, retries - 1);
      } else {
        throw error;
      }
    }
  },[]);

  const handleDelete = useCallback(async () => {
    if (selectedPostId !== null) {
      setIsLoading(true);
      try {
        const response = await retryFetch(`/api/posts/${selectedPostId}`, { method: 'DELETE' }, 3);
        const { post } = await response.json();
        setFilteredPosts((prev) => prev.filter((p) => p.id !== post.id));
        setSelectedPostId(null);
        setErrorMessage(null);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('An unknown error occurred.');
        }
      } finally {
        setIsLoading(false);
      }
    }
  }, [selectedPostId, retryFetch]);
  

  const handleFilterChange = (inputValue: string) => {
    if (inputValue === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) => post.id.toString().includes(inputValue));
      setFilteredPosts(filtered);
    }
  };

  // Prevent scrolling when the modal is open
  useEffect(() => {
    if (selectedPostId !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPostId]);

  return (
    <div className="container mx-auto px-4">
      <Filter onFilterChange={handleFilterChange} />
      {/* Show general error message if any (not related to delete) */}
      {errorMessage && !selectedPostId && (
        <div className="bg-red-100 text-red-700 border border-red-400 rounded p-4 my-4">
          {errorMessage}
        </div>
      )}
      {/* Render Modal when a post is selected */}
      {selectedPostId !== null && (
        <Modal
          title="Confirm Deletion"
          description="Are you sure you want to delete this post?"
          handleDelete={handleDelete}
          handleCancel={handleCloseModal}
          errorMessage={errorMessage}
          isLoading={isLoading}
        />
      )}
      {/* Show message if no posts match the filter */}
      {filteredPosts.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">No posts found. Try a different ID.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(({ id, title, body, user }) => (
            <Card
              key={id}
              id={id}
              title={title}
              body={body}
              user={user}
              handleDelete={() => handleOpenModal(id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(PostsList);