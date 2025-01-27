"use client";
import { Post } from '@/data/types';
import Button from '@/components/Button';

interface CardProps extends Post {
  handleDelete: () => void;
}

export default function Card({ title, body, user, handleDelete }: CardProps) {
  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg p-6 border border-gray-200">
      <div className="flex-auto">
        <div className="text-xl text-black font-semibold mb-2">{title}</div>
        <p className="text-gray-600 mb-4">{body}</p>
        <div className="text-sm text-gray-500 mb-4">By: {user.name}</div>
      </div>
      <Button text="Delete" onClick={handleDelete} variant="danger" />
    </div>
  );
}
