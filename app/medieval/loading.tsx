import styles from "@/app/styles/loading.module.scss"
import Image from 'next/image'

export default function Loading() {
 
  return (
  <div className={styles.main}>
    <Image fill={true} src={"/image/라오콘군상.jpg"} alt={"고대"}/>
  </div>
  )
}
