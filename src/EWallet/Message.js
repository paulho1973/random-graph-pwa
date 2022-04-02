import { useState, useEffect } from 'react'

import styles from './EWallet.module.css';
    
const Message = ({ msg }) => {
  const [show, setShow] = useState(true)

  // On componentDidMount set the timer
  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShow(false)
    }, 3000)

    return () => {
      setShow(true)
      clearTimeout(timeId)
    }
  }, [msg]);

  // If show is false the component will return null and stop here
  if (!show) {
    return null;
  }

  // If show is true this will be returned
  return (
    <div className={styles.toast}>
      {msg}
    </div>
  )
}

export default Message;