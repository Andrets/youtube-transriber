import styles from './styles.moduel.css'
export const CaptionTable = ({ captions }) => {
	const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) {
      return 'Invalid time';
    }
    const date = new Date(timeInSeconds * 1000);
    const milliseconds = (timeInSeconds % 1).toFixed(3).split('.')[1];
    return `${date.toISOString().split('T')[1].split('.')[0]}.${milliseconds}`;
  };
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
              <td>{formatTime(caption.start)}</td>
              <td>{formatTime(caption.end)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};