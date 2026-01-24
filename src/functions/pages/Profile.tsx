import React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { MapPin, Camera } from "lucide-react";

const mockPosts = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop",
    title: "Paris Sunsets",
    location: "Paris, France",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop",
    title: "London Bridge",
    location: "London, UK",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=300&fit=crop",
    title: "Venice Canals",
    location: "Venice, Italy",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400&h=300&fit=crop",
    title: "Amsterdam Vibes",
    location: "Amsterdam, NL",
  },
];

const mockUser = {
  name: "Yuval Kot",
  bio: "Travel lover",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(mockUser.name);
  const [tempUsername, setTempUsername] = useState(mockUser.name);
  const [avatarUrl, setAvatarUrl] = useState(mockUser.avatar);
  const [tempAvatarUrl, setTempAvatarUrl] = useState(mockUser.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditToggle = () => {
    if (isEditing) {
      setUsername(tempUsername);
      setAvatarUrl(tempAvatarUrl);
    } else {
      setTempUsername(username);
      setTempAvatarUrl(avatarUrl);
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setTempUsername(username);
    setTempAvatarUrl(avatarUrl);
    setIsEditing(false);
  };

  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setTempAvatarUrl(url);
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-background w-full max-w-97.5 mx-auto">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-97.5 mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-foreground">Profile</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEditToggle}
              className="text-primary font-medium"
            >
              {isEditing ? "Save" : "Edit"}
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-97.5 mx-auto px-4 py-6">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <Avatar
              className={`size-24 ring-4 ring-primary/20 ${
                isEditing ? "cursor-pointer" : ""
              }`}
              onClick={handleAvatarClick}
            >
              <AvatarImage
                src={isEditing ? tempAvatarUrl : avatarUrl}
                alt={username}
              />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {username
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <button
                type="button"
                onClick={handleAvatarClick}
                className="absolute bottom-0 right-0 size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md"
                aria-label="Change profile picture"
              >
                <Camera className="size-4" />
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              aria-label="Upload profile picture"
            />
          </div>

          {isEditing ? (
            <input
              type="text"
              value={tempUsername}
              onChange={(e) => setTempUsername(e.target.value)}
              className="text-xl font-semibold text-foreground text-center bg-transparent border-b-2 border-primary outline-none px-2 py-1 mb-1"
              autoFocus
            />
          ) : (
            <h2 className="text-xl font-semibold text-foreground mb-1">
              {username}
            </h2>
          )}

          <p className="text-muted-foreground">{mockUser.bio}</p>

          {isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="mt-2 text-muted-foreground"
            >
              Cancel
            </Button>
          )}
        </div>

        {/* Posts Section */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            My Posts
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {mockPosts.map((post) => (
              <Card
                key={post.id}
                className="rounded-xl bg-card border border-border shadow-sm overflow-hidden"
              >
                <div className="aspect-4/3 relative">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-foreground text-sm truncate">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="size-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground truncate">
                      {post.location}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
