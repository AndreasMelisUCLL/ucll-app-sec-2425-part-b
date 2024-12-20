import styles from "../styles/UsersTable.module.css";

const UsersTable: React.FC = () => {
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Username</th>
            <th className={styles.th}>Password</th>
            <th className={styles.th}>Role</th>
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
          <tr className={styles.tr}>
            <td className={styles.td}>john_doe</td>
            <td className={styles.td}>john123</td>
            <td className={styles.td}>guest</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default UsersTable;
