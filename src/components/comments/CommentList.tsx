import type { CollectionEntry } from "astro:content";
import React, { useMemo } from "react";
import { ProfilePicture } from "../ProfilePicture";

type CommentList = CollectionEntry<"comments">["data"];

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
    <div className={`${indentClasses[indentLevel]} mb-4`}>
      <div className="bg-surface rounded-lg p-4 shadow-sm border border-border">
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
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="text-content-strong font-medium">
                {comment.createdBy.fullName}
              </h4>
              <span className="text-sm text-content-light">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-1 text-content text-[15px] leading-relaxed">
              {comment.text}
            </p>

            {/* Comment Actions */}
            <div className="mt-2 flex items-center gap-4">
              <button className="text-sm text-primary hover:text-primary-hover">
                Reply
              </button>
              <button className="text-sm text-content-light hover:text-content">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Nested Replies */}
      {replies.length > 0 && (
        <div className="mt-2">
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
        <CommentItem
          key={comment.id}
          comment={comment}
          replies={organizedComments.getReplies(comment.id)}
          level={0}
          getReplies={organizedComments.getReplies}
        />
      ))}
    </div>
  );
};

export default CommentList;
