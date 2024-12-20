import Head from "next/head";
import styles from "@/styles/Profile.module.css";
import Header from "@/components/Header";
import ChessBoard from "@/components/ChessBoard";

const Profile: React.FC = () => {
  return (
    <div className="min-h-full">
      <Head>
        <title>Boardflex | Profile</title>
      </Head>
      <Header activeTab="profile"/>
      <main className={styles.main}>
        <h1>Profile</h1>
        <div className={styles["profile-container"]}>
            <ChessBoard 
            boardSize={600}
            reskins={[
                { piece: "wK", theme: { name: "california" } },
                { piece: "wQ", theme: { name: "horsey" } },
                { piece: "wR", theme: { name: "california" } },
                { piece: "wB", theme: { name: "horsey" } },
                { piece: "bP", theme: { name: "california" } },
            ]}
            perspective="black"
            />
            <div className={styles["user-info"]}>
                <h2>User Information</h2>
                <p>Name: John Doe</p>
                <p>Email: john.doe@example.com</p>
                <p>Bio: A passionate chess player and software developer. 
                    Loves to solve complex problems and contribute to open-source projects.</p>
            </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;