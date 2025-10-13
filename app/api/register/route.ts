import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

const COOKIE_NAME = 'sessionToken';

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: 'Name, email, and password are required.' },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const { data: user, error } = await supabase
    .from('users')
    .insert({
      name,
      email,
      password_hash: hashedPassword,
      session_token: null,
      session_expiry: null,
    })
<<<<<<< HEAD
    .select("id, name, email, created_at")
=======
    .select('id, name, email, avatar, created_at')
>>>>>>> a237486153cdf4c235eedbe5c2d18b4508dd1558
    .single();

  if (error || !user) {
    return NextResponse.json(
      { error: error?.message || 'Registration failed.' },
      { status: 400 }
    );
  }

  const shortId = uuidv4().slice(0, 8);
  const defaultUserName = name.toLowerCase().replace(/\s+/g, '_');
  const userName = `${defaultUserName}_${shortId}`;

  await supabase.from('profiles').insert({
    user_id: user.id,
    bio: '',
    height: null,
    weight: null,
    user_name: userName,
    weight_goal: null,
    body_measurements: {
      chest: null,
      waist: null,
      hips: null,
      thighs: null,
    },
  });

  const token = crypto.randomBytes(32).toString('hex');
  const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await supabase
    .from('users')
    .update({ session_token: token, session_expiry: expiry.toISOString() })
    .eq('id', user.id);

  const res = NextResponse.json({ user, message: 'Registration successful!' });
  res.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    path: '/',
    maxAge: 24 * 60 * 60,
  });

  return res;
}
