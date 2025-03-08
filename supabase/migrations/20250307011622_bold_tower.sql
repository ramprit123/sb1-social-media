/*
  # Initial Schema Setup for Social Media App

  1. Tables
    - profiles
      - id (uuid, references auth.users)
      - username (text, unique)
      - display_name (text)
      - avatar_url (text)
      - bio (text)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - posts
      - id (uuid)
      - user_id (uuid, references profiles)
      - content (text)
      - image_url (text)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - likes
      - id (uuid)
      - user_id (uuid, references profiles)
      - post_id (uuid, references posts)
      - created_at (timestamp)
    
    - comments
      - id (uuid)
      - user_id (uuid, references profiles)
      - post_id (uuid, references posts)
      - content (text)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - follows
      - follower_id (uuid, references profiles)
      - following_id (uuid, references profiles)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create tables if they don't exist
DO $$ 
BEGIN
  -- Create profiles table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'profiles') THEN
    CREATE TABLE profiles (
      id uuid REFERENCES auth.users ON DELETE CASCADE,
      username text UNIQUE NOT NULL,
      display_name text,
      avatar_url text,
      bio text,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now(),
      PRIMARY KEY (id)
    );
  END IF;

  -- Create posts table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'posts') THEN
    CREATE TABLE posts (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
      content text NOT NULL,
      image_url text,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );
  END IF;

  -- Create likes table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'likes') THEN
    CREATE TABLE likes (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
      post_id uuid REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
      created_at timestamptz DEFAULT now(),
      UNIQUE(user_id, post_id)
    );
  END IF;

  -- Create comments table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'comments') THEN
    CREATE TABLE comments (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
      post_id uuid REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
      content text NOT NULL,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );
  END IF;

  -- Create follows table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'follows') THEN
    CREATE TABLE follows (
      follower_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
      following_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
      created_at timestamptz DEFAULT now(),
      PRIMARY KEY (follower_id, following_id)
    );
  END IF;
END $$;

-- Enable Row Level Security (idempotent operations)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DO $$ 
BEGIN
  -- Profiles policies
  DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
  DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
  
  -- Posts policies
  DROP POLICY IF EXISTS "Posts are viewable by everyone" ON posts;
  DROP POLICY IF EXISTS "Users can create posts" ON posts;
  DROP POLICY IF EXISTS "Users can update own posts" ON posts;
  DROP POLICY IF EXISTS "Users can delete own posts" ON posts;
  
  -- Likes policies
  DROP POLICY IF EXISTS "Likes are viewable by everyone" ON likes;
  DROP POLICY IF EXISTS "Users can create likes" ON likes;
  DROP POLICY IF EXISTS "Users can delete own likes" ON likes;
  
  -- Comments policies
  DROP POLICY IF EXISTS "Comments are viewable by everyone" ON comments;
  DROP POLICY IF EXISTS "Users can create comments" ON comments;
  DROP POLICY IF EXISTS "Users can update own comments" ON comments;
  DROP POLICY IF EXISTS "Users can delete own comments" ON comments;
  
  -- Follows policies
  DROP POLICY IF EXISTS "Follows are viewable by everyone" ON follows;
  DROP POLICY IF EXISTS "Users can create follows" ON follows;
  DROP POLICY IF EXISTS "Users can delete own follows" ON follows;
END $$;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Posts are viewable by everyone"
  ON posts FOR SELECT
  USING (true);

CREATE POLICY "Users can create posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts"
  ON posts FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Likes are viewable by everyone"
  ON likes FOR SELECT
  USING (true);

CREATE POLICY "Users can create likes"
  ON likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own likes"
  ON likes FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Comments are viewable by everyone"
  ON comments FOR SELECT
  USING (true);

CREATE POLICY "Users can create comments"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
  ON comments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Follows are viewable by everyone"
  ON follows FOR SELECT
  USING (true);

CREATE POLICY "Users can create follows"
  ON follows FOR INSERT
  WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can delete own follows"
  ON follows FOR DELETE
  USING (auth.uid() = follower_id);

-- Create or replace function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'display_name'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop and recreate trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();