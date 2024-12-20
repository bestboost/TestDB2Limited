import mongoose from 'mongoose';

const fileUploadSchema = new mongoose.Schema(
  {
    audioFile: {
      type: String, // шлях до аудіофайлу або URL
      required: true,
    },
    text: {
      type: String, // текст після перетворення голосу в текст
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FileUpload = mongoose.model('FileUpload', fileUploadSchema);

export default FileUpload;
