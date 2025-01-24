import type { CollectionEntry } from "astro:content";
import React, { useMemo, useState } from "react";
import { ProfilePicture } from "../ProfilePicture";
import Button from "../ui/Button";
import CommentForm from "./CommentForm";
import Text from "../ui/Text";
import TextButton from "../ui/TextButton";

type CommentList = CollectionEntry<"comments">["data"][];

interface CommentListProps {
  comments: CommentList;
}

interface CommentItemProps {
  comment: CommentList[number];
  replies: CommentList;
  level: number;
  getReplies: (parentId: string) => CommentList;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  replies,
  level,
  getReplies,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const maxLevel = 4; // Maximum nesting level
  const indentLevel = Math.min(level, maxLevel);
  const indentClasses: Record<number, string> = {
    0: "",
    1: "ml-4",
    2: "ml-8",
    3: "ml-12",
    4: "ml-16",
  };

  return (
    <div className={`${indentClasses[indentLevel]} space-y-4`}>
      <div className="flex items-start gap-3">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <ProfilePicture
            fullName={comment.createdBy.fullName}
            profilePictureUrl={comment.createdBy.profilePictureUrl}
            className="w-10 h-10"
          />
        </div>

        {/* Comment Content */}
        <div className="flex-1 space-y-2">
          <div className="flex justify-between gap-2">
            <Text variant="h6">{comment.createdBy.fullName}</Text>
            <time
              className="flex-shrink-0 text-sm text-content-light"
              dateTime={comment.createdAt.toISOString()}
            >
              {comment.createdAt.toLocaleDateString("en-us", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>

          <Text variant="body">{comment.text}</Text>

          {/* Comment Actions */}
          {!isReplying && (
            <TextButton size="sm" onClick={() => setIsReplying(!isReplying)}>
              Reply
            </TextButton>
          )}
        </div>
      </div>

      {/* Reply Form */}
      {isReplying && (
        <CommentForm
          parentId={comment.id}
          onCancel={() => setIsReplying(!isReplying)}
        />
      )}

      {/* Nested Replies */}
      {replies.length > 0 && (
        <div className="pt-4 border-t border-border">
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              replies={getReplies(reply.id)}
              level={level + 1}
              getReplies={getReplies}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  // Organize comments into a nested structure
  const organizedComments = useMemo(() => {
    const commentMap = new Map<string | null, CommentList>();

    // Initialize the map with an empty array for null (top-level comments)
    commentMap.set(null, []);

    // Group comments by parentId
    comments.forEach((comment) => {
      const parentId = comment.parentId ?? null;

      if (!commentMap.has(parentId)) {
        commentMap.set(parentId, []);
      }
      commentMap.get(parentId)?.push(comment);
    });

    return {
      topLevelComments: commentMap.get(null) || [],
      getReplies: (parentId: string) => commentMap.get(parentId) || [],
    };
  }, [comments]);

  return (
    <div className="space-y-4">
      {organizedComments.topLevelComments.map((comment) => (
        <div className="bg-surface rounded-lg p-4 shadow-sm border border-border">
          <CommentItem
            key={comment.id}
            comment={comment}
            replies={organizedComments.getReplies(comment.id)}
            level={0}
            getReplies={organizedComments.getReplies}
          />
        </div>
      ))}
    </div>
  );
};

export default CommentList;
