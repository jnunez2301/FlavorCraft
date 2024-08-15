
import { css } from "@emotion/css";
type AvatarProps = {
  avatarImg: string;
  fallback: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (...args: any[]) => any;
}
/**
 * Avatar component
 * @param avatarImg: The URL of the image to be displayed.
 * @param fallback: The fallback text to be displayed if the image is not available. 
 * */  
export const Avatar = ({ avatarImg, fallback = "U", onClick }: AvatarProps) => {
  fallback = fallback.split(" ").map((n) => n[0].toUpperCase()).join("");
  return (
    <picture onClick={onClick} className={css({
      borderRadius: "50%",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "50px",
      height: "50px",
      img: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
      background: "var(--info-color)",
      transition: "background 0.2s ease-in",
      cursor: "pointer",
      ":hover": {
        background: "var(--info-color-hover)",
      }
    })}>
      {avatarImg && avatarImg.length > 0 ? (
        <img
          src={avatarImg}
          alt="Image of user"
          onError={(e) => {
            e.currentTarget.src = "/soup.svg";
          }}
        />
      ) : (
        <span>{fallback}</span>
      )}
    </picture>
  );
};
