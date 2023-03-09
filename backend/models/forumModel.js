import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
})

const PostSchema = new mongoose.Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  comments: [CommentSchema],
  created_at: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', PostSchema);

export default Post;
 