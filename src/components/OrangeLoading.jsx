import styles from './OrangeLoading.module.css'
function OrangeLoading({orangeColor}) {
     
    return (
        <div className={`${styles.wrapper} `}>
        <div className={`${styles.circle} ${orangeColor}`}></div>
        <div className={`${styles.circle} ${orangeColor}`}></div>
        <div className={`${styles.circle} ${orangeColor}`}></div>
        <div className={`${styles.shadow}`}></div>
        <div className={`${styles.shadow}`}></div>
        <div className={`${styles.shadow}`}></div>
        <span className='orange'>Loading</span>
    </div>
    )
}

export default OrangeLoading
