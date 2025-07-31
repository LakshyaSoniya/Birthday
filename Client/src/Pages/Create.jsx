import React, { useState } from 'react';
import axios from 'axios';

function Create() {
  const [formData, setFormData] = useState({
    birthdayPersonName: '',
    selfName: '',
    nickname: '',
    password: ''
  });
  
  const [homeContent, setHomeContent] = useState({
    title: '',
    subtitle: '',
    message: ''
  });

  const [letterContent, setLetterContent] = useState({
    title: '',
    greeting: '',
    body: [''],
    specialMessage: '',
    signature: '',
    signatureName: ''
  });
  
  const [memories, setMemories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [audioFile, setAudioFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHomeContentChange = (e) => {
    const { name, value } = e.target;
    setHomeContent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLetterContentChange = (e) => {
    const { name, value } = e.target;
    setLetterContent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBodyChange = (index, value) => {
    const newBody = [...letterContent.body];
    newBody[index] = value;
    setLetterContent(prev => ({
      ...prev,
      body: newBody
    }));
  };

  const addBodyParagraph = () => {
    setLetterContent(prev => ({
      ...prev,
      body: [...prev.body, '']
    }));
  };

  const removeBodyParagraph = (index) => {
    if (letterContent.body.length > 1) {
      const newBody = letterContent.body.filter((_, i) => i !== index);
      setLetterContent(prev => ({
        ...prev,
        body: newBody
      }));
    }
  };

  const handleMemoryImageSelect = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newMemory = {
          id: Date.now() + Math.random(),
          file: file,
          preview: event.target.result,
          caption: '',
          subtitle: ''
        };
        setMemories(prev => [...prev, newMemory]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const updateMemoryData = (id, field, value) => {
    setMemories(prev => prev.map(memory => 
      memory.id === id ? { ...memory, [field]: value } : memory
    ));
  };

  const removeMemory = (id) => {
    setMemories(prev => prev.filter(memory => memory.id !== id));
  };

  const handleAudioSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile({
        file: file,
        name: file.name,
        preview: URL.createObjectURL(file)
      });
    }
  };

  const removeAudio = () => {
    if (audioFile?.preview) {
      URL.revokeObjectURL(audioFile.preview);
    }
    setAudioFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const submitData = new FormData();
      
      // Add form data
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      
      // Add home content
      Object.keys(homeContent).forEach(key => {
        submitData.append(`home_${key}`, homeContent[key]);
      });

      // Add letter content
      Object.keys(letterContent).forEach(key => {
        if (key === 'body') {
          // Send body as a simple array, not indexed
          letterContent.body.forEach((paragraph, index) => {
            if (paragraph && paragraph.trim() !== '') {
              submitData.append('letter_body', paragraph.trim());
            }
          });
        } else {
          submitData.append(`letter_${key}`, letterContent[key]);
        }
      });
      
      // Add memory images and their data
      memories.forEach((memory, index) => {
        submitData.append('memoryImages', memory.file);
        submitData.append(`memoryCaptions[${index}]`, memory.caption);
        submitData.append(`memorySubtitles[${index}]`, memory.subtitle);
      });

      // Add audio file
      if (audioFile) {
        submitData.append('audioFile', audioFile.file);
      }

      const response = await axios.post(`${import.meta.env.VITE_URL}/api/users/signup`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Birthday content created successfully!');
      // Reset form
      setFormData({
        birthdayPersonName: '',
        selfName: '',
        nickname: '',
        password: ''
      });
      setHomeContent({
        title: '',
        subtitle: '',
        message: ''
      });
      setLetterContent({
        title: '',
        greeting: '',
        body: [''],
        specialMessage: '',
        signature: '',
        signatureName: ''
      });
      setMemories([]);
      setAudioFile(null);
      
    } catch (error) {
      console.error('Error creating content:', error);
      alert('Error creating content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Create Birthday Surprise
          </h1>
          <p className="text-gray-600 text-lg">Make someone's day extra special</p>
        </div>

        {/* Main Form */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Birthday Person's Name (As username) *
                </label>
                <input
                  type="text"
                  name="birthdayPersonName"
                  value={formData.birthdayPersonName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none transition-colors"
                  placeholder="Enter birthday person's name"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="selfName"
                  value={formData.selfName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Nickname
                </label>
                <input
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none transition-colors"
                  placeholder="Sweet nickname for them"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Login Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none transition-colors"
                  placeholder="Password for birthday person to login"
                />
              </div>
            </div>

            {/* Audio File Section */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                🎵 Preferred Song
              </h2>
              
              <div className="text-center mb-4">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioSelect}
                  className="hidden"
                  id="audioInput"
                />
                <label
                  htmlFor="audioInput"
                  className="cursor-pointer bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                >
                  🎶 Upload Audio File
                </label>
                <p className="text-gray-500 mt-2">Upload their favorite song (MP3, WAV, etc.)</p>
              </div>

              {/* Audio Preview */}
              {audioFile && (
                <div className="bg-gray-50 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-center">
                  <div className="flex-1">
                    <p className="font-medium text-gray-700 mb-2">Selected Audio:</p>
                    <p className="text-sm text-gray-600 mb-3">{audioFile.name}</p>
                    <audio controls className="w-full">
                      <source src={audioFile.preview} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      onClick={removeAudio}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Home Content Section */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                🏠 Home Page Content
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Home Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={homeContent.title}
                    onChange={handleHomeContentChange}
                    className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none transition-colors"
                    placeholder="e.g., Happy Birthday My Love!"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Home Subtitle
                  </label>
                  <input
                    type="text"
                    name="subtitle"
                    value={homeContent.subtitle}
                    onChange={handleHomeContentChange}
                    className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none transition-colors"
                    placeholder="A sweet subtitle for home page"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Home Message
                  </label>
                  <textarea
                    name="message"
                    value={homeContent.message}
                    onChange={handleHomeContentChange}
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none transition-colors"
                    placeholder="Main message for home page..."
                  />
                </div>
              </div>
            </div>

            {/* Letter Content Section */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                💌 Letter Content
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Letter Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={letterContent.title}
                      onChange={handleLetterContentChange}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
                      placeholder="e.g., Happy Birthday!"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Greeting
                    </label>
                    <input
                      type="text"
                      name="greeting"
                      value={letterContent.greeting}
                      onChange={handleLetterContentChange}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
                      placeholder="e.g., Dear My Love"
                    />
                  </div>
                </div>

                {/* Letter Body Paragraphs */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-gray-700 font-semibold">
                      Letter Body Paragraphs
                    </label>
                    <button
                      type="button"
                      onClick={addBodyParagraph}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      + Add Paragraph
                    </button>
                  </div>
                  
                  {letterContent.body.map((paragraph, index) => (
                    <div key={index} className="flex gap-2 mb-3">
                      <textarea
                        value={paragraph}
                        onChange={(e) => handleBodyChange(index, e.target.value)}
                        rows="2"
                        className="flex-1 px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
                        placeholder={`Paragraph ${index + 1}...`}
                      />
                      {letterContent.body.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeBodyParagraph(index)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Special Message
                  </label>
                  <textarea
                    name="specialMessage"
                    value={letterContent.specialMessage}
                    onChange={handleLetterContentChange}
                    rows="2"
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
                    placeholder="A special highlighted message..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Signature
                    </label>
                    <input
                      type="text"
                      name="signature"
                      value={letterContent.signature}
                      onChange={handleLetterContentChange}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
                      placeholder="e.g., With love and warm wishes"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Signature Name
                    </label>
                    <input
                      type="text"
                      name="signatureName"
                      value={letterContent.signatureName}
                      onChange={handleLetterContentChange}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
                      placeholder="Your name or relationship"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Memory Images Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                📸 Memory Images & Photos
              </h2>
              
              <div className="text-center mb-4">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleMemoryImageSelect}
                  className="hidden"
                  id="memoryImageInput"
                />
                <label
                  htmlFor="memoryImageInput"
                  className="cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-700 px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                >
                  📷 Add Photos & Memory Images
                </label>
                <p className="text-gray-500 mt-2">Upload all your special photos and memory images here</p>
              </div>

              {/* Memory Images List */}
              {memories.length > 0 && (
                <div className="space-y-4 mt-6">
                  <h3 className="text-lg font-semibold text-gray-700">Uploaded Images ({memories.length}):</h3>
                  {memories.map((memory) => (
                    <div key={memory.id} className="bg-gray-50 rounded-xl p-4 flex flex-col sm:flex-row gap-4">
                      {/* Image Preview */}
                      <div className="flex-shrink-0">
                        <img
                          src={memory.preview}
                          alt="Memory Preview"
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      </div>
                      
                      {/* Image Details */}
                      <div className="flex-1 space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Photo Caption
                          </label>
                          <input
                            type="text"
                            value={memory.caption}
                            onChange={(e) => updateMemoryData(memory.id, 'caption', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-400 focus:outline-none"
                            placeholder="What's this photo about?"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Photo Subtitle
                          </label>
                          <input
                            type="text"
                            value={memory.subtitle}
                            onChange={(e) => updateMemoryData(memory.id, 'subtitle', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-400 focus:outline-none"
                            placeholder="Brief description"
                          />
                        </div>
                      </div>
                      
                      {/* Delete Button */}
                      <div className="flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => removeMemory(memory.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Privacy Notice */}
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-2xl">🔒</span>
                <h3 className="text-xl font-bold text-green-800">Privacy Guaranteed</h3>
              </div>
              <p className="text-green-700 text-sm sm:text-base">
                This is fully personal content. No one can see your history or data. 
                All information is securely stored and remains completely private between you and your loved one.
              </p>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-6">
              <button
                type="submit"
                disabled={isLoading || !formData.birthdayPersonName || !formData.selfName || !formData.password}
                className="bg-gradient-to-r from-pink-400 to-pink-600 text-white px-12 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '🎁 Creating...' : '🎉 Create Birthday Surprise'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;