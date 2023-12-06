"use client";
import Link from "next/link";
// Styles
import styles from "../styles.module.scss";

export default function Aboutlinks() {
  const menuHandler = (value: any) => {
    if (typeof window !== "undefined") {
      const element = document.getElementById(value);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  return (
    <div className={styles["link-section"]}>
      {/* <Link href="/">About Us</Link> */}
      <a onClick={() => menuHandler("howWorks")}>Blog</a>
      <a onClick={() => menuHandler("favoriteSection")}>Team</a>
      <Link href="/">Career</Link>
      <Link href="/">Contact</Link>
    </div>
  );
}
