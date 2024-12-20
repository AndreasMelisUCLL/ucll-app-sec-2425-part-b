import { useTranslation } from "react-i18next";
import styles from "../styles/UsersTable.module.css";
import { useEffect, useState } from "react";

const UsersTable: React.FC = () => {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure that translation happens on the client side
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server side
  }
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>{t("username")}</th>
            <th className={styles.th}>{t("password")}</th>
            <th className={styles.th}>{t("role")}</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.tr}>
            <td className={styles.td}>jane_doe</td>
            <td className={styles.td}>jane123</td>
            <td className={styles.td}>user</td>
          </tr>
          <tr className={styles.tr}>
            <td className={styles.td}>admin1</td>
            <td className={styles.td}>adminpass</td>
            <td className={styles.td}>admin</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
export default UsersTable;
