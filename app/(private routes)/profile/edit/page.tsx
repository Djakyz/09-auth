import { getServerMe } from "@/lib/api/serverApi";
import css from "./EditProfilePage.module.css";
import { Metadata } from "next";
import EditProfile from "@/app/(private routes)/profile/edit/EditProfile";
import { BASE_URL } from "@/lib/api/api";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getServerMe();
  const title = user?.username
    ? `${BASE_URL} - Edit Profile of ${user.username}`
    : `${BASE_URL} - Edit Profile`;
  const description = "Manage your account settings on" + BASE_URL;
  return {
    title,
    description,
  };
}

export default async function ProfilePage() {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <EditProfile user={user} />
      </div>
    </main>
  );
}
