import { cookies } from 'next/headers';

export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function checkAuth() {
  const cookieStore = await cookies();
  const password = cookieStore.get('admin_password')?.value;
  return password === ADMIN_PASSWORD;
}

export async function login(password: string) {
  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set('admin_password', password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    return true;
  }
  return false;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_password');
}
