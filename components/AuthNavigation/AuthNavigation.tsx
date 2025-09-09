"use client";
import css from "./AuthNavigation.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import TagsMenu from "../TagsMenu/TagsMenu";
import Link from "next/link";
import { logout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

const AuthNavigation = () => {
  const router = useRouter();
  const { user, isAuthenticated, clearisAuthenticated } = useAuthStore();
  const handleClickLogOut = async () => {
    await logout();
    clearisAuthenticated();
    router.push("/sign-in");
  };
  return (
    <>
      {isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <TagsMenu />
          </li>
          <li className={css.navigationItem}>
            <Link href={"/profile"}>Profile</Link>
          </li>
          <li>
            <p className={css.userEmail}>{user?.email}</p>
            <button
              className={css.logoutButton}
              type="button"
              onClick={handleClickLogOut}
            >
              Log Out
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link href="/sign-in">Sign In</Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/sign-up">Sign Up</Link>
          </li>
        </>
      )}
    </>
  );
};

export default AuthNavigation;
