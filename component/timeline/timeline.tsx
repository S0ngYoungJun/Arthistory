import NavLinks from '@/component/timeline/nav-links'
import styles from "@/app/styles/timeline.module.scss"

export default function Timeline() {

  return (
    <div className={styles.timeline}>
      <div className={styles.timelink}>
        <NavLinks />
      </div>
    </div>
  );
}
