// import EmptySubscription from "./emptySubscription";
export default async function Dashboard() {
  // design pour chaque composant aussi à refaire j'ai juste déplacé
  // ici tu retourne 2 chose avant de display le contenu

  //1 - s'il n'a aucun compte linked tu retournes an empty screen que tu vas faire

  // tu retournes un empty screen si subscription.length === 0

  // const userRes = await userSub();
  // if (userRes.subscription.length === 0) return <EmptySubscription />;

  return (
    <div className="px-6 pt-8">
      {/*  A mettre en composant */}
      <h5 className="my-3 text-gray-800 text-xl">Spendings</h5>

      <div className="w-full flex flex-row gap-4">
        <div className="w-[450px] h-full">
          {/* <BarChartCard total={120} /> */}
        </div>
        <div className="w-[300px] flex flex-col space-y-2">
          {/* <PieChartCard /> */}
        </div>
      </div>
      {/* <NextPayment /> */}
      <div className=" flex flex-row gap-4 flex-wrap mt-4 h-[200px]">
        <div>{/* <RecentSubscription /> */}</div>
      </div>
    </div>
  );
}
