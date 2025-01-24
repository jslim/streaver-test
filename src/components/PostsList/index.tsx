import React from 'react';

interface PostsListProps {
  text?: string;
}

const PostsList: React.FC<PostsListProps> = ({ text = 'Default Text' }) => {
  return (
    <div className="flex">
     {text}
    </div>
  );
};

export default PostsList;
