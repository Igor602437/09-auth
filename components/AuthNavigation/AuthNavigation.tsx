'use client';
import css from './AuthNavigation.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import TagsMenu from '../TagsMenu/TagsMenu';
import Link from 'next/link';
import { logout } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';

const AuthNavigation = () => {
  const router = useRouter();
  const { user, isAuthenticated, clearisAuthenticated } = useAuthStore();
  const handleClickLogOut = async () => {
    await logout();
    clearisAuthenticated();
    router.push('/sign-in');
  };
  // console.log(user?.avatar);
  return (
    <>
      {isAuthenticated ? (
        <>
          <li>
            <TagsMenu />
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
              // avatar={user?.avatar}
            >
              Profile
            </Link>
          </li>

          <li className={css.navigationItem}>
            {/* <p className={css.userEmail}>User email</p> */}
            <p className={css.userEmail}>{user?.email}</p>
            <button className={css.logoutButton} onClick={handleClickLogOut}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>

          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Register
            </Link>
          </li>
        </>
      )}
    </>
  );
};

export default AuthNavigation;
