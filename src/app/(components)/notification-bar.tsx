import tw from "tailwind-styled-components";

export const NotificationBar = () => {
  return (
    <NotificationContainer>
      <div className="flex h-full items-center justify-center md:w-[1080px]">
        {/* notifications */}
      </div>
    </NotificationContainer>
  );
};

const NotificationContainer = tw.div`
  flex h-[24px] w-full items-center justify-center bg-transparent absolute
  `;
