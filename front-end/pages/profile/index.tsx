import Head from "next/head";

import { PieceCode } from "@/types";
import styles from "@/styles/Profile.module.css";

import ChessBoard from "@/components/ChessBoard";
import Header from "@/components/Header";

const Profile: React.FC = () => {
    const reskins = [
        { 
            piece: "wK" as PieceCode, 
            theme: { name: "california" } 
        },
        { 
            piece: "wQ" as PieceCode, 
            theme: { name: "horsey" } 
        },
        { 
            piece: "wR" as PieceCode, 
            theme: { name: "california" } 
        },
        { 
            piece: "wB" as PieceCode, 
            theme: { name: "horsey" } },
        { 
            piece: "bP" as PieceCode, 
            theme: { name: "california" } 
        },
    ];
    const perspective = "black";

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
                        reskins={reskins}
                        perspective={perspective}
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