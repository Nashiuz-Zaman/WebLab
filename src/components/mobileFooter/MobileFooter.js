//component
import LinkGroup from "../linkGroup/LinkGroup";
import ImageButton from "../imageButton/ImageButton";
import Address from "../address/Address";

//styles
import styles from "./MobileFooter.module.css";

const currentYear = new Date().getFullYear();

export default function MobileFooter({
  appName = "",
  companyName = "",
  developer = "",
  logoButtonsArray = [],
  extraClass = [],
  bottomOptionsArray = [],
  normalOptionsArray = undefined,
  addressData = undefined,
  imageSource = "",
}) {
  return (
    <footer className={styles["mobile-footer"]}>
      <div
        className={styles["mobile-footer__address-part"]}
        style={{ background: `url(${imageSource})` }}
      >
        {addressData && (
          <Address companyName={companyName} infoData={addressData} />
        )}
      </div>

      <div className={styles["mobile-footer__top"]}>
        <div className={styles["mobile-footer__top__links"]}>
          {normalOptionsArray &&
            normalOptionsArray.map((option) => {
              return <LinkGroup key={option.id} singleListObject={option} />;
            })}
        </div>
      </div>

      <div className={styles["mobile-footer__bottom"]}>
        {bottomOptionsArray.length > 0 && (
          <div className={styles["mobile-footer__bottom__buttons"]}>
            {bottomOptionsArray.map((single) => {
              return <LinkGroup key={single.id} singleListObject={single} />;
            })}
          </div>
        )}

        {logoButtonsArray.length > 0 && (
          <div className={styles["mobile-footer__bottom__image-buttons"]}>
            {logoButtonsArray.map((buttonInfo) => {
              return (
                <ImageButton
                  externalLink={true}
                  key={buttonInfo.id}
                  imageSource={buttonInfo}
                />
              );
            })}
          </div>
        )}

        <div className={styles["mobile-footer__bottom__copyright-info"]}>
          <p
            className={styles["mobile-footer__bottom__copyright-info--details"]}
          >
            &#169; {`${currentYear} ${appName}, developed by ${developer}`}
          </p>
        </div>
      </div>
    </footer>
  );
}
