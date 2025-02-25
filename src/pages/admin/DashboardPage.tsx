import { useState } from "react";

import DistributorsTable from "@/components/pageComponents/distributor/distributorTable";
import DistributorForm from "@/components/pageComponents/distributor/distributorForm/distributorForm";

const DashboardPage = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center w-full pl-10 pr-16">
      <div className=" flex flex-col justify-center w-full gap-5">
        <DistributorsTable formState={showForm} setShowForm={setShowForm} />
        <div className="w-full">{showForm && <DistributorForm  />}</div>
      </div>
    </div>
  );
};

export default DashboardPage;