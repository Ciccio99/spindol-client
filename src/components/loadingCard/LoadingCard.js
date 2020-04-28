import React from 'react';
import styles from './LoadingCard.module.css';
import logo from '../../assets/sleepwell-logo.png';

const LoadingCard = () => {

  return (
    <div className={styles.card}>
      <img className={styles.pulse} width='300' src={logo} alt='Hypnos Logo'/>
      <h1>Loading...</h1>
    </div>
  );
}

export default LoadingCard;
