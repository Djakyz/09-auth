"use client";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./SignInPage.module.css";
import { login } from "@/lib/api/clientApi";
import { Credentials } from "@/types/user";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignInPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);
  const handleSubmit = async (formData: FormData) => {
    try {
      const values = Object.fromEntries(formData) as unknown as Credentials;
      const user = await login(values);
      if (user) {
        setUser(user);
        router.push("/profile");
      }
    } catch (error) {
      setError((error as ApiError).message ?? "something went wrong");
    }
  };
  return (
    <div>
      <main className={css.mainContent}>
        <form className={css.form} action={handleSubmit}>
          <h1 className={css.formTitle}>Sign in</h1>

          <div className={css.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className={css.input}
              required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className={css.input}
              required
            />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.submitButton}>
              Log in
            </button>
          </div>
        </form>
        {error && <p className={css.error}>{error}</p>}
      </main>
    </div>
  );
};

export default SignInPage;
