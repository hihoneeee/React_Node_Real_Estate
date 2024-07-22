import { BreadCreumbAdmin, TextH1 } from "src/components";
import { path } from "src/utils/path";
import { Table } from "src/components";
const ManageCategory = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <TextH1 title="Manage Category" />
        <BreadCreumbAdmin />
      </div>
      <div>
        <Table
          route={`/${path.ADMIN}/${path.CATEGORY}/${path.CREATE_CATEGORY}`}
        />
      </div>
    </div>
  );
};

export default ManageCategory;
