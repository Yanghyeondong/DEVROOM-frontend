"use client";

import { useUserStore } from "@/store/userStore";
import styles from "./page.module.css";
import ProfilePic from "/public/icons/MyProfile.svg";
import { useRouter } from "next/navigation";
import { useFetchService } from "@/api/hooks/useStudent";
import { type ServiceSchema } from "@/type/schemas";

const MyPage = () => {
  const router = useRouter();
  const { name, role, studentId, email, logout } = useUserStore(
    (state) => state
  );
  
  const { data: serviceData, isLoading, error } = useFetchService();
  let numberOfElements = 0;
  if (serviceData) serviceData.map(() => (numberOfElements++));

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleDeleteAccount = () => {
    logout();
    router.push("/onboarding");
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <ProfilePic />
        <h1 className={styles.userName}>{name}</h1>
        <p className={styles.userRole}>
          {role === "Student" ? "학생" : "교수"}
        </p>
        <p className={styles.userId}>{studentId}</p>
      </div>
      <div className={styles.infoSection}>
        <h2 className={styles.sectionTitle}>내 정보</h2>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>이름:</span>
          <span className={styles.infoValue}>{name}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>역할:</span>
          <span className={styles.infoValue}>
            {role === "Student" ? "학생" : "교수"}
          </span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>학번/교번:</span>
          <span className={styles.infoValue}>{studentId}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>이메일:</span>
          <span className={styles.infoValue}>{email}</span>
        </div>
      </div>

      <div className={styles.statisticsSection}>
        <h2 className={styles.sectionTitle}>컨테이너 정보</h2>
        <div className={styles.statsItem}>
          <span className={styles.statsLabel}>총 컨테이너 수:</span>
          <span className={styles.statsValue}>{numberOfElements}</span>
        </div>
        {/* <div className={styles.statsItem}>
          <span className={styles.statsLabel}>이번 학기 사용시간:</span>
          <span className={styles.statsValue}>20시간</span>
        </div> */}
      </div>

      <div className={styles.linkSection}>
        <h2 className={styles.sectionTitle}>로그인 관리</h2>
        <div className={styles.linkItem}>회원 정보 변경하기</div>
        <div className={styles.linkItem} onClick={handleLogout}>
          로그아웃
        </div>
        <div className={styles.linkItem} onClick={handleDeleteAccount}>
          탈퇴하기
        </div>
      </div>
    </div>
  );
};

export default MyPage;
