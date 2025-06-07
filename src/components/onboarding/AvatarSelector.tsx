import React from 'react';
import { User } from 'lucide-react';

interface AvatarSelectorProps {
  selectedAvatar: string | null;
  onSelect: (avatar: string) => void;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ selectedAvatar, onSelect }) => {
  // For MVP, we'll use some placeholder avatar images from a free service
  const avatarOptions = [
    'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=150',
    'https://images.pexels.com/photos/5326953/pexels-photo-5326953.jpeg?auto=compress&cs=tinysrgb&w=150',
    'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150',
    'https://images.pexels.com/photos/2102415/pexels-photo-2102415.jpeg?auto=compress&cs=tinysrgb&w=150',
    'https://images.pexels.com/photos/1310474/pexels-photo-1310474.jpeg?auto=compress&cs=tinysrgb&w=150',
    'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=150',
  ];

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Alege un avatar</h3>
      
      <div className="grid grid-cols-3 gap-4">
        {avatarOptions.map((avatar, index) => (
          <button
            key={index}
            type="button"
            className={`relative overflow-hidden rounded-full h-24 w-24 mx-auto flex items-center justify-center border-2 transition-all
              ${selectedAvatar === avatar
                ? 'border-indigo-600 ring-2 ring-indigo-300'
                : 'border-gray-200 hover:border-gray-300'
              }`}
            onClick={() => onSelect(avatar)}
          >
            <img
              src={avatar}
              alt={`Avatar option ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        <p className="text-sm text-gray-500">Sau</p>
      </div>

      <div className="mt-4">
        <label
          htmlFor="custom-avatar"
          className="flex items-center justify-center px-6 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <User className="mr-2 h-5 w-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-600">Încarcă o imagine</span>
          <input
            id="custom-avatar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                // In a real app, we'd upload the file to storage
                // For the MVP, we'll use a URL.createObjectURL
                const avatarUrl = URL.createObjectURL(file);
                onSelect(avatarUrl);
              }
            }}
          />
        </label>
      </div>
    </div>
  );
};

export default AvatarSelector;