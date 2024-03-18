import styles from "@/app/styles/loading.module.scss"
import Image from 'next/image'

export default function Loading() {
 
  return (
  <div className={styles.main}>
    <Image fill={true} src={"/image/파르나소스.jpg"} alt={"고대"}/>
  </div>
  )
}
