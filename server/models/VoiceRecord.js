import mongoose from 'mongoose';

const voiceRecordSchema = new mongoose.Schema(
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

const VoiceRecord = mongoose.model('VoiceRecord', voiceRecordSchema);

export default VoiceRecord;
