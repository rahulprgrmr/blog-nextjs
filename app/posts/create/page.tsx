import PostSaveForm from "@/components/post-save-form";

function CreatePost() {
  return (
    <div className="container mx-auto bg-white rounded shadow-md mt-3 p-4">
      <h2 className="font-bold text-lg">Create Post</h2>
      <PostSaveForm />
    </div>
  );
}

export default CreatePost;
