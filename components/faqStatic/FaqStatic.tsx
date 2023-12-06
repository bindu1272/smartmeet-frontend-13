// Styles
import styles from "./styles.module.scss";
import FaqPanel from "./faqPanel";

export default function FaqStatic(props: any) {
  const faqs: any = [
    {
      question: "How do I cancel my appointment?",
      answer:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
    {
      question: "How do I cancel my appointment?",
      answer:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
    {
      question: "How do I cancel my appointment?",
      answer:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
    {
      question: "How do I cancel my appointment?",
      answer:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
    {
      question: "How do I cancel my appointment?",
      answer:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    },
  ];

  return (
    <div className={styles["faq-style"]}>
      <div className={styles["header-section"]}>
        <div className={styles["title2"]}>FAQ</div>
      </div>
      <FaqPanel faqs={faqs} />
    </div>
  );
}
