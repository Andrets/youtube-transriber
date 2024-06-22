import styles from './styles.moduel.css'
export const CaptionTable = ({ captions }) => {
  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr>
            <th>Text</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {captions.map((caption, index) => (
            <tr key={index}>
              <td>{caption.text}</td>
              <td>{caption.start}</td>
              <td>{caption.end}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};