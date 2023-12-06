import {Row, Col} from "antd";
import ButtonPrimary from "../../buttons/buttonPrimary";
import getConfig from 'next/config';
import Image from "next/image";

// Styles
import styles from "./styles.module.scss";
const blogUrl = process.env.NEXT_APP_BLOG_API;

export default function HealthTips(props:any) {
  const cardDataList = [
    {
      imgUrl:
        "https://images.unsplash.com/photo-1467453678174-768ec283a940?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZnJ1aXRzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      date: "28th May 2021",
      cardTitle: "Eat fresh Fruits and vegetable Daily",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
    },
    {
      imgUrl:
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8ZnJ1aXRzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      date: "28th May 2021",
      cardTitle: "Eat fresh Fruits and vegetable Daily",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
    },
    {
      imgUrl:
        "https://images.unsplash.com/photo-1474564862106-1f23d10b9d72?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGZydWl0c3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      date: "28th May 2021",
      cardTitle: "Eat fresh Fruits and vegetable Daily",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
    },
    {
      imgUrl:
        "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTJ8fGZydWl0c3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      date: "28th May 2021",
      cardTitle: "Eat fresh Fruits and vegetable Daily",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
    },
    {
      imgUrl:
        "https://images.unsplash.com/photo-1534533983688-c7b8e13fd3b6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTUxfHxmcnVpdHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      date: "28th May 2021",
      cardTitle: "Eat fresh Fruits and vegetable Daily",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
    },
    {
      imgUrl:
        "https://images.unsplash.com/photo-1444459094717-a39f1e3e0903?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTM3fHxmcnVpdHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      date: "28th May 2021",
      cardTitle: "Eat fresh Fruits and vegetable Daily",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
    },
    {
      imgUrl:
        "https://images.unsplash.com/photo-1598264100889-f607dc58f5fa?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTh8fGZydWl0c3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      date: "28th May 2021",
      cardTitle: "Eat fresh Fruits and vegetable Daily",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
    },
    {
      imgUrl:
        "https://images.unsplash.com/photo-1610348725531-843dff563e2c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fGZydWl0c3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      date: "28th May 2021",
      cardTitle: "Eat fresh Fruits and vegetable Daily",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
    },
  ];

  return (
    <div className={styles["health-style"]}>
      <div className={styles["header-section"]}>
        <div className={"title2" + " " +  styles["title2"]}>Health tips and Advise</div>
      </div>

      <div className={styles["image-card-section"]}>
        <Row style={{width: '100%'}} gutter={50}>
          {(props.blogs || []).map((data:any,index:any) => (
            <Col xs={24} xl={6} key={index}>
              <div className={styles["card-body"] +" "+data.cardStyle}>
                <div className={styles["img-card"]}>
                  <Image alt="" width={10} height={10}
                    src={blogUrl+data.image.url}
                    className={styles["icon-image"]+" "+ data.style}
                  />
                </div>
                <div className={styles["date"]}>{data.date}</div>
                <div className={styles["card-title"]}>{data.title}</div>
                <div className={styles["description"]}>{data.content}</div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <div className={styles["button-section"]}>
        <a href="/blog">
        <ButtonPrimary title="Read More" />
        </a>
      </div>
    </div>
  );
}
