//components
import InputBox from "../inputBox/InputBox";
import SelectBox from "../selectBox/SelectBox";
import SubmitButton from "../submitButton/SubmitButton";
import SuccessIcon from "../successIcon/SuccessIcon";

//custom hook
import useFormContext from "../../hooks/useFormContext";
import useMediaQueryContext from "../../hooks/useMediaQueryContext";

//styles
import styles from "./Form.module.css";

export default function Form({
  imageSource = "",
  additionalData = undefined,
  sectionTitle = undefined,
  description = undefined,
}) {
  const {
    formFinalState,
    dispatch,
    selectBoxErrors,
    selectBoxFunctions,
    selectBoxValues,
    selectBoxResetFunctions,
    submit,
    reset,
  } = useFormContext();

  const { mediaQueryFinalState } = useMediaQueryContext();

  return (
    <>
      {/* this is displayed only when viewing on mobile or small tablet */}
      {(sectionTitle || description) &&
        (mediaQueryFinalState.mobileMatches ||
          mediaQueryFinalState.smallTabletMatches) && (
          <div className={styles["section-title-and-description"]}>
            {sectionTitle}
            {description}
          </div>
        )}

      <div className={styles["form-container"]}>
        {/* this is displayed only when viewing on large tablet or computers */}
        {(sectionTitle || description) &&
          (mediaQueryFinalState.largeTabletMatches ||
            mediaQueryFinalState.computerScreenMatches) && (
            <div className={styles["section-title-and-description"]}>
              {sectionTitle}
              {description}
            </div>
          )}
        <div
          className={styles["form-container__imgbox"]}
          style={{
            background: `url(${imageSource})`,
          }}
        >
          <form
            noValidate
            className={`${styles["form-container__form"]}`}
            onSubmit={null}
          >
            <div
              className={`${
                styles["form-container__form__basic-information"]
              } ${
                formFinalState.processStage === "basic"
                  ? styles["visible"]
                  : styles["hidden"]
              }`}
            >
              <InputBox
                value={formFinalState.name}
                onFocus={() => {
                  dispatch({ type: "resetNameError" });
                }}
                onChange={(e) => {
                  dispatch({ type: "changeName", payload: e.target.value });
                }}
                labelText={"Full name"}
                placeholder={"i.e. Vanessa Smith"}
                errorText={formFinalState.nameError}
              />
              <InputBox
                value={formFinalState.email}
                onFocus={() => {
                  dispatch({ type: "resetEmailError" });
                }}
                onChange={(e) => {
                  dispatch({ type: "changeEmail", payload: e.target.value });
                }}
                type={"email"}
                labelText={"Email"}
                placeholder={"i.e. vanessa.smith@gmail.com"}
                errorText={formFinalState.emailError}
              />
              <InputBox
                value={formFinalState.phone}
                onFocus={() => {
                  dispatch({ type: "resetPhoneError" });
                }}
                onChange={(e) => {
                  dispatch({ type: "changePhone", payload: e.target.value });
                }}
                type={"tel"}
                labelText={"Phone"}
                placeholder={"i.e. 9001234567"}
                errorText={formFinalState.phoneError}
              />
              <SubmitButton
                extraClass={[styles["form-container__form__submit-button"]]}
                onClick={submit}
                buttonText={"Get Started"}
              />
            </div>

            <div
              className={`${
                styles["form-container__form__additional-information"]
              } ${
                formFinalState.processStage === "additional"
                  ? styles["visible"]
                  : styles["hidden"]
              }`}
            >
              {additionalData.selectBoxData &&
                additionalData.selectBoxData.map((single, i) => {
                  return (
                    <SelectBox
                      onFocus={selectBoxResetFunctions[i]}
                      onChange={selectBoxFunctions[i]}
                      value={selectBoxValues[i]}
                      key={single.id}
                      labelText={single.labelText}
                      optionsArray={single.options}
                      errorText={selectBoxErrors[i]}
                    />
                  );
                })}

              <SubmitButton
                extraClass={[styles["form-container__form__submit-button"]]}
                onClick={submit}
                buttonText={"Submit"}
              />
            </div>

            <div
              className={`${styles["form-container__form__success-message"]} ${
                formFinalState.processStage === "final"
                  ? styles["visible"]
                  : styles["hidden"]
              }`}
            >
              <SuccessIcon
                extraClass={[
                  styles["form-container__form__success-message__checkbox"],
                ]}
              />

              <p
                className={
                  styles["form-container__form__success-message__heading"]
                }
              >
                {`Thank you ${formFinalState.name}
              `}
              </p>
              <p
                className={
                  styles["form-container__form__success-message__details"]
                }
              >
                Your request for a free consultation regarding{" "}
                {formFinalState.service} has been received. We will reach out to
                you tomorrow between {formFinalState.time}.
              </p>
              <SubmitButton
                extraClass={[styles["form-container__form__submit-button"]]}
                onClick={reset}
                buttonText={"Close"}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
