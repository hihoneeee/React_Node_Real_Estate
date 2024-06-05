import { BreadCreumbAdmin, TextH1 } from "src/components";
import { path } from "src/utils/path";
import { Table } from "src/components";
const ManagePropertyType = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <TextH1 title="Manage Property Type" />
        <BreadCreumbAdmin />
      </div>
      <div>
        <Table
          route={`/${path.ADMIN}/${path.PROPERTY_TYPE}/${path.CREATE_PROPERTY_TYPE}`}
        />
      </div>
    </div>
  );
};

export default ManagePropertyType;
