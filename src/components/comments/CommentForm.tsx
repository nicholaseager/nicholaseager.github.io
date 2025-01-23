import { useState } from "react";
import NetlifyForm from "../form/NetlifyForm";
import Button from "../ui/Button";

interface CommentFormProps {
  parentId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  parentId,
  onSuccess,
  onCancel,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const handleSuccess = () => {
    // Reset form state
    setName("");
    setEmail("");
    setComment("");
    onSuccess?.();
  };

  return (
    <NetlifyForm name="comment" onSuccess={handleSuccess}>
      <input type="hidden" name="parentId" value={parentId} />

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Comment *
        </label>
        <textarea
          id="comment"
          name="message"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          rows={4}
          className="w-full p-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
        />

        <div className="mt-2 flex justify-end gap-2">
          {onCancel && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" variant="primary" size="sm">
            Send Comment
          </Button>
        </div>
      </div>
    </NetlifyForm>
  );
};

export default CommentForm;
