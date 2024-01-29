import { AppGallery, AppStore, PlayStore } from "@@components/store";

export const MobileApp = () => {
  return (
    <div className="h-screen flex bg-gradient-to-b from-blue-300 from-10% to-orange-50 pt-[150px] text-white md:flex md:pt-0">
      <div className="md:grid-cols-2 w-full grid-cols-1 grid">
        <Primary />
        <Secondary />
      </div>
    </div>
  );
}

const Primary = () => (
  <div className="flex w-full">
    <div className="flex flex-col items-start md:pl-24 justify-center space-y-6 md:space-y-10">
      <h1 className="max-w-[8ch] text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-blue-900 via-70% to-blue-700 font-extrabold tracking-tighter md:text-6xl">
        Download the app.
      </h1>
      <p className="my-3 max-w-[36ch] text-[16px] text-slate-600 md:text-lg">
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
)
const Secondary = () => {
  return (
    <div className="hidden items-center justify-center w-full md:flex">
      <div className={`flex items-center justify-start relative bg-[url('/images/handheld_v2.png')] h-[800px] w-full bg-contain bg-no-repeat`}>
      </div>
    </div>
  )
}
