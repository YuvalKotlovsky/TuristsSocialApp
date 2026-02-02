import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Post } from "@/types";
import PostForm, { type PostFormValues } from "../components/PostForm";
import { getPostById, updatePost } from "@/services/posts.service";
import { ROUTES } from "@/constants/routes";

export default function EditPost() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void (async () => {
      if (!postId) return;
      setLoading(true);
      try {
        const p = await getPostById(postId);
        setPost(p);
      } finally {
        setLoading(false);
      }
    })();
  }, [postId]);

  const handleEdit = async (values: PostFormValues) => {
    if (!postId) return;

    setSaving(true);
    try {
      const updated = await updatePost(postId, {
        content: values.content,
        location: values.location,
        image: values.image,
      });

      if (!updated) return;
      navigate(ROUTES.VIEW_POST(postId), { replace: true });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!post) return <div className="p-6">Post not found</div>;

  return (
    <PostForm
      mode="edit"
      initialValues={post}
      onSubmit={handleEdit}
      onCancel={() => navigate(ROUTES.VIEW_POST(post.id))}
      isSubmitting={saving}
      submitText="Save Changes"
    />
  );
}
