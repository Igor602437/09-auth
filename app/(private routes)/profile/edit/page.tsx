'use client';

import { useRouter } from 'next/navigation';
import css from './EditProfilePage.module.css';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';
import { useState } from 'react';
import { updateUser } from '@/lib/api/clientApi';

const EditProfile = () => {
  const user = useAuthStore(s => s.user);
  const setUser = useAuthStore(s => s.setUser);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    try {
      setError(null);
      const raw = formData.get('username');
      const username = typeof raw === 'string' ? raw.trim() : '';

      if (!username) {
        console.log(username);
        setError('Enter username');
        return;
      }
      if (user?.username === username) {
        router.push('/profile');
        return;
      }

      const updatedUser = await updateUser({ username });
      setUser(updatedUser);
      router.push('/profile');
    } catch (err) {
      console.error(err);
      setError('Profile update failed');
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar || '/default-avatar.png'}
          alt={user?.username || 'User Avatar'}
          width={120}
          height={120}
          className={css.avatar}
          priority
        />

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              name="username"
              defaultValue={user?.username ?? ''}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
        </form>
        {error && <p className={css.error}>{error}</p>}
      </div>
    </main>
  );
};

export default EditProfile;
