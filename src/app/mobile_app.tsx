import { AppGallery, AppStore, PlayStore } from "@@components/store";

export const MobileApp = () => {
  return (
    <div className="flex h-[550px] bg-gradient-to-b from-blue-100 from-10% to-paper pt-[150px] text-white md:flex md:h-screen md:pt-0">
      <div className="grid w-full grid-cols-1 md:grid-cols-2">
        <Primary />
        <Secondary />
      </div>
    </div>
  );
};

const Primary = () => (
  <div className="flex w-full">
    <div className="flex flex-col  items-center justify-center space-y-6 md:items-start md:space-y-10 md:pl-24">
      <h1 className="-ml-6 max-w-[8ch] bg-gradient-to-r from-blue-950 via-blue-900 via-70% to-blue-700 bg-clip-text text-5xl font-extrabold tracking-tighter text-transparent md:-ml-0 md:text-6xl">
        Download the app.
      </h1>
      <p className="my-3 max-w-[36ch] pl-8 text-[16px] text-slate-600 md:pl-0 md:text-lg">
        Upgrade your lifestyle with FastInsure App! Monitor coverage status,
        request road-side assist, renew policy, and explore best deals.
      </p>

      <div className="grid grid-cols-2 gap-x-2 gap-y-4 py-4 md:flex md:justify-between">
        <AppStore />
        <PlayStore />
        <AppGallery />
      </div>
    </div>
  </div>
);
const Secondary = () => {
  return (
    <div className="hidden w-full items-center justify-center md:flex">
      <div
        className={`relative flex h-[800px] w-full items-center justify-start bg-[url('/images/handheld_v2.png')] bg-contain bg-no-repeat`}
      >
        <div className="flex h-[800px] w-full bg-gradient-to-b from-transparent from-85% to-paper"></div>
      </div>
    </div>
  );
};
